from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

def init_auth(supabase_client):
    global supabase
    supabase = supabase_client
    
## POST /signup (Sign up user)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    required = ['name', 'email', 'password', 're_password', 'role']

    if any(field not in data for field in required):
        return jsonify({'error': 'Missing fields'}), 400

    if data['password'] != data['re_password']:
        return jsonify({'error': 'Passwords do not match'}), 400

    try:
        auth_response = supabase.auth.sign_up({"email": data['email'], "password": data['password']})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

    if not auth_response.user:
        return jsonify({'error': 'Sign up failed'}), 400

    user_id = auth_response.user.id

    profile_data = {
        "user_id": user_id,
        "name": data['name'],
        "email": data['email'],
        "role": data['role']
    }

    supabase.table('users').insert(profile_data).execute()
    if(data['role'] == "Intern"):
        supabase.table('internships').insert({"intern_id": user_id}).execute()

    return jsonify({
        "message": "User signed up successfully",
        "user": {
            "id": user_id,
            "email": data['email'],
            "name": data['name'],
            "role": data['role']
        }
    }), 201


## POST /login (User Login)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": data['email'],
            "password": data['password']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

    if not auth_response.user:
        return jsonify({'error': 'Invalid credentials'}), 401

    user = auth_response.user 
    session = auth_response.session 

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id, 
            "email": user.email
        },
        "session": {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token
        }
    }), 200


## POST /logout (User Logout)
@auth_bp.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()

    access_token = data.get('access_token')
    if not access_token:
        return jsonify({'error': 'Access token is required'}), 400

    try:
        supabase.auth.sign_out(access_token)
        return jsonify({"message": "Logout successful"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
