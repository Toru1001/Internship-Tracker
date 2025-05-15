from flask import Flask, jsonify, request
from supabase import create_client, Client
from dotenv import load_dotenv
from auth import auth_bp, init_auth
from flask_cors import CORS
from datetime import datetime
from werkzeug.utils import secure_filename
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
@app.route('/lacking', methods=['GET'])
def get_lacking():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId is required'}), 400
    response = supabase.table('work_logs').select('status, task_id(*)').eq('intern_id', user_id).eq('status', 'Lacking requirement').execute()
    return jsonify(response.data)

## GET /feedbacks?user_id=###
## Fetch feedbacks logged by intern
@app.route('/feedbacks', methods=['GET'])
def get_feedbacks():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId is required'}), 400

    response = supabase.table('feedback').select('*, log_id(*, task_id(*), internship_id(supervisor_id(name)))').eq('log_id.intern_id', user_id).order('feedback_id', desc=True).execute()
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

        logs_response = supabase.table('work_logs').select('* , task_id(*, intern_id(name))').in_('intern_id', intern_ids).eq('archive', False).order('log_id', desc=True).execute()
        return jsonify(logs_response.data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
## GET /feedback/single?log_id=???
## Fetch single feedback from supervisor
@app.route('/feedback/single', methods=['GET'])
def get_singleFeedback():
    log_id = request.args.get('log_id')
    if not log_id:
        return jsonify({'error': 'log_id is required'}), 400
    response = supabase.table('feedback').select('comments').eq('log_id', log_id).order('feedback_id', desc=True).limit(1).execute()
    return jsonify(response.data)
    
## GET /supervisor/archives?user_id=###
## Fetch all tasks logged by interns of the supervisor
@app.route('/supervisor/archives', methods=['GET'])
def get_supervisorArchives():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId is required'}), 400

    try:
        intern_response = supabase.table('internships').select('intern_id').eq('supervisor_id', user_id).execute()
        intern_ids = [row['intern_id'] for row in intern_response.data]

        if not intern_ids:
            return jsonify([])

        logs_response = supabase.table('work_logs').select('status,log_id, task_id(*, intern_id(name))').in_('intern_id', intern_ids).eq('archive', True).execute()
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
    required = ['title', 'description', 'start_time', 'end_time', 'start_proof', 'end_proof']

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
            'end_time': data['end_time'],
            'start_proof': data['start_proof'],
            'end_proof': data['end_proof']
        }).execute()

        task_data = task_response.data[0] 

        start_time = datetime.strptime(data['start_time'], "%H:%M")
        end_time = datetime.strptime(data['end_time'], "%H:%M")
        duration = (end_time - start_time).seconds / 3600
        
        
        internship_response = supabase.table('internships').select('internship_id').eq('intern_id', user_id).execute()
        print('Here')

        worklog_response = supabase.table('work_logs').insert({
            'task_id': task_data['task_id'],
            'hours_worked': round(duration, 2),
            'status': "For review",
            'archive': False,
            "intern_id": user_id,
            "internship_id": internship_response.data[0]['internship_id']
        }).execute()

        return jsonify({
            'task': task_data,
            'work_log': worklog_response.data[0]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
## POST /feedback
## Insert feedback data to feedbacks table

@app.route('/log/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    required = ['log_id','comments', 'status']


    if any(field not in data for field in required):
        return jsonify({'error': 'Missing fields'}), 400

    try:
        current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        task_response = supabase.table('feedback').insert({
            'log_id': data['log_id'],
            'comments': data['comments'],
            'date_given': current_datetime,
            'task_status': data['status']
        }).execute()
        
        if data['status'] == "Approved" or data['status'] == "Denied":
            task_update = supabase.table('work_logs').update({'status': data['status'], 'archive' : True}).eq('log_id', data['log_id']).execute()
        else:
            task_update = supabase.table('work_logs').update({'status': data['status'], 'archive' : False}).eq('log_id', data['log_id']).execute()

        task_data = task_response.data[0]

        return jsonify({
            'message': 'Status updated!',
            'task': task_data,
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
##  POST /update-total-hours?userId=###
## Updates and calculated approved logs total_hours worked
@app.route('/update-total-hours', methods=['POST'])
def update_total_hours():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId is required'}), 400

    try:
        internship_response = supabase.table('internships') \
            .select('internship_id, intern_id') \
            .eq('supervisor_id', user_id).execute()

        internships = internship_response.data

        for internship in internships:
            internship_id = internship['internship_id']
            intern_id = internship['intern_id']

            logs_response = supabase.table('work_logs') \
                .select('hours_worked') \
                .eq('intern_id', intern_id) \
                .eq('status', 'Approved') \
                .eq('archive', True) \
                .execute()

            logs = logs_response.data
            total_hours = sum(log['hours_worked'] for log in logs if log['hours_worked'] is not None)

            supabase.table('internships') \
                .update({'total_hours': total_hours}) \
                .eq('internship_id', internship_id) \
                .execute()

        return jsonify({'message': 'Total hours updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

## POST /upload-proofs
## Upload start_proof and end_proof images for a task
@app.route('/upload-proofs', methods=['POST'])
def upload_proofs():
    user_id = request.args.get('userId')

    if not user_id:
        return jsonify({'error': 'userId is required as a query parameter'}), 400

    start_proof_file = request.files.get('start_proof')
    end_proof_file = request.files.get('end_proof')

    if not start_proof_file or not end_proof_file:
        return jsonify({'error': 'start_proof and end_proof images are required'}), 400

    try:
        start_proof_path = f'start_proof/{start_proof_file.filename}'
        end_proof_path = f'end_proof/{end_proof_file.filename}'

        start_proof_bytes = start_proof_file.read()
        end_proof_bytes = end_proof_file.read()

        supabase.storage.from_('proofs').upload(
            path=start_proof_path,
            file=start_proof_bytes,
            file_options={"content-type": start_proof_file.mimetype}
        )

        supabase.storage.from_('proofs').upload(
            path=end_proof_path,
            file=end_proof_bytes,
            file_options={"content-type": end_proof_file.mimetype}
        )

        # get_public_url returns string directly
        start_proof_url = supabase.storage.from_('proofs').get_public_url(start_proof_path)
        end_proof_url = supabase.storage.from_('proofs').get_public_url(end_proof_path)

        return jsonify({
            'start_proof_url': start_proof_url,
            'end_proof_url': end_proof_url
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
