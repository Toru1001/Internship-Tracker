from flask import Flask, jsonify, request
from supabase import create_client, Client
from dotenv import load_dotenv
from auth import auth_bp, init_auth
from flask_cors import CORS
from datetime import datetime
import os

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

init_auth(supabase)
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

app.register_blueprint(auth_bp)

## GET /userdetails?user_id=###
@app.route('/userdetails', methods=['GET'])
def get_userdetails():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId is required'}), 400

    response = supabase.table('users').select('*').eq('user_id', user_id).execute()
    if response.data:
        return jsonify(response.data[0])
    else:
        return jsonify({'error': 'User not found'}), 404

## GET /interns?user_id=###
## Fetch interns of supervisor
@app.route('/interns', methods=['GET'])
def get_interns():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId is required'}), 400
    response = supabase.table('internships').select('*, intern_id(name, email)').eq('supervisor_id', user_id).execute()
    return jsonify(response.data)

## GET /interns/available
## Fetch all interns that has no  supervisors
@app.route('/interns/available', methods=['GET'])
def get_avaialableInterns():
    response = supabase.table('internships').select('internship_id, intern_id(name, email)').is_('supervisor_id', None).execute()
    return jsonify(response.data)

## GET /tasks?user_id=###
## Fetch tasks logged by intern
@app.route('/tasks', methods=['GET'])
def get_tasks():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId is required'}), 400
    response = supabase.table('work_logs').select('status, task_id(*)').eq('intern_id', user_id).execute()
    return jsonify(response.data)

## GET /supervisor/logs?user_id=###
## Fetch all tasks logged by intterns of the supervisor
@app.route('/supervisor/logs', methods=['GET'])
def get_supervisorLogs():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId is required'}), 400

    try:
        intern_response = supabase.table('internships').select('intern_id').eq('supervisor_id', user_id).execute()
        intern_ids = [row['intern_id'] for row in intern_response.data]

        if not intern_ids:
            return jsonify([])

        logs_response = supabase.table('work_logs').select('status, task_id(*, intern_id(name))').in_('intern_id', intern_ids).execute()
        return jsonify(logs_response.data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500



## =========================================================================================================

## PUT /interns/add?user_id=###
## Updates internship details and assigns supervisor
@app.route('/interns/add', methods=['PUT'])
def add_intern():
    user_id = request.args.get('userId')
    data = request.get_json()

    if not user_id:
        return jsonify({'error': 'userId is required'}), 400

    if 'internshipId' not in data:
        return jsonify({'error': 'internshipId is required in the request body'}), 400

    try:
        current_date = datetime.now().strftime('%Y-%m-%d')

        response = supabase.table('internships').update({
            'supervisor_id': user_id,
            'start_date': current_date,
            'hours_worked': 0,
            'status': 'Active'
        }).eq('internship_id', data['internshipId']).execute()

        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
from flask import request, jsonify
from datetime import datetime


## ==========================================================================================================================

## POST /task/log?userId=###
## Insert task data to tasks table and work logs
@app.route('/task/log', methods=['POST'])
def log_task():
    user_id = request.args.get('userId')
    data = request.get_json()
    required = ['title', 'description', 'start_time', 'end_time']

    if not user_id:
        return jsonify({'error': 'userId is required'}), 400

    if any(field not in data for field in required):
        return jsonify({'error': 'Missing fields'}), 400

    try:
        current_date = datetime.now().strftime('%Y-%m-%d')

        # Insert into tasks
        task_response = supabase.table('tasks').insert({
            'intern_id': user_id,
            'title': data['title'],
            'task_description': data['description'],
            'date_logged': current_date,
            'start_time': data['start_time'],
            'end_time': data['end_time']
        }).execute()

        task_data = task_response.data[0] 

        start_time = datetime.strptime(data['start_time'], "%H:%M")
        end_time = datetime.strptime(data['end_time'], "%H:%M")
        duration = (end_time - start_time).seconds / 3600

        worklog_response = supabase.table('work_logs').insert({
            'task_id': task_data['task_id'],
            'hours_worked': round(duration, 2),
            'status': "For review",
            "intern_id": user_id
        }).execute()

        return jsonify({
            'task': task_data,
            'work_log': worklog_response.data[0]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
