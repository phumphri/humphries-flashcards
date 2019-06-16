
# Upgrade libraries.
import os
if False:
    os.system("python -m pip install --upgrade pip")
    os.system("python -m pip install --upgrade flask")
    os.system("python -m pip install --upgrade flask_cors")
    os.system("pip install flask")
    os.system("pip install flask_cors")
    os.system("pip install flask_moment")
    os.system("pip install flask_bootstrap")
    # os.system("pip install psycopg2")

# Application microservice.
import flask                            
from flask import (
    Response,
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

# Current date and time.
from flask_moment import Moment        
import datetime

 # Will not need since application server does everything.
from flask_cors import CORS            

# Dynamically arrange objects on webpage.
from flask_bootstrap import Bootstrap   

# S3 access.  
import boto3                            
import botocore

# HTTP exceptions.
from werkzeug.exceptions import (    
    NotFound, 
    InternalServerError,
    NotImplemented)

# Needed for database connection.
import socket                          

# JSON fuctions.
import json                             
import pprint

# Libraries for accessing Postgres.
import psycopg2

# Assigning the Flask framework.
app = Flask(__name__)

# Rendering the single-page application.
@app.route("/")
def home():
    return render_template("index.html", 
        project_name="Flashcards", 
        current_time=datetime.datetime.utcnow())

# Error Handler for Page Not Found
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html', 
        project_name="Oops!", 
        message_from_the_application = e,
        current_time=datetime.datetime.utcnow()), 404

@app.route("/oops")
def simulate_page_not_found():
    raise NotFound('Just a test.  Everything is okay.')
 
@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html', 
        project_name="Bummer!", 
        message_from_the_application = e,
        current_time=datetime.datetime.utcnow()), 500

@app.route("/bummer")
def simulate_internal_server_error():
    raise InternalServerError('Relax.  This was only a test.')
    
@app.route("/screen_too_small/<screen_width>")
def screen_too_small_error(screen_width):
    print('\n\nScreen too small was called.  Screen width:', screen_width)
    return render_template('500.html', 
        project_name="Bummer!", 
        message_from_the_application = "The screen is too small.  Need a width of 1920 pixels or greater.  It was " + screen_width + ".",
        current_time=datetime.datetime.utcnow()), 500
    
# Error Handler for Not Implemented Exception
@app.errorhandler(501)
def not_implemented_exception(e):
    return render_template('501.html', 
        message_from_application = e,
        project_name="Not Implemented", 
        current_time=datetime.datetime.utcnow()), 501

@app.route("/not_implemented")
def simulate_not_implemented():
    raise NotImplemented('Relax, this was only a test message.')

# Accessor Get Class Folders
@app.route("/get_classes", methods=['GET'])
def get_classes():

    classes = s3_get_classes()

    classes  = {"classes": classes}

    # Convert the dictionary into a json string.
    classes = json.dumps(classes)

    # Return a response.
    response = Response(classes, status=200, mimetype='application/json')
    return response

# Accessor Get Week Folder for a Class Folder
@app.route("/get_weeks/<class_code>", methods=['GET'])
def get_weeks(class_code):

    weeks = s3_get_weeks(class_code)

    weeks  = {"weeks": weeks}

    # Convert the dictionary into a json string.
    weeks = json.dumps(weeks)


    # Return a response.
    response = Response(weeks, status=200, mimetype='application/json')
    return response


# Accessor Get Word JSON files for a Week Folder under a Class Folder
@app.route("/get_words/<class_code>/<week>", methods=['GET'])
def get_words(class_code, week):

    # An array of word json objects is returned.
    words = s3_get_words(class_code, week)

    # A dictionary with a "words" attribute with the array of words.
    words = {"words": words}

    # Convert the dictionary into a json string.
    words = json.dumps(words)

    # Return a response.
    response = Response(words, status=200, mimetype='application/json')
    return response

# Mutator Add Word
@app.route('/upload_word/<class_code>/<week>', methods=['POST'])
def add_word(class_code, week):

    try:
        # Convert the transported string into a dictiornary.
        if request.is_json:

            # The transported string is converted into a json object.
            word = request.get_json()

            # Database update returns an HTTP status code.
            status_code = s3_upload_word(class_code, week, word)

            # Format a resonse with just the status code.
            response = Response(status=status_code)
            return response
        else:
            print('request was NOT json.')
            raise InternalServerError('Request was not in JSON format.')

    except UnicodeDecodeError as e:
        print('UnicodeDecodeError was encountered in add_word')
        raise InternalServerError('An UnicodeDecoderError was thrown while parsing request:  ' + str(e))

    except Exception as f:
        print('\n\nException was thrown in add_word.')
        print('Exception:', str(f))
        print('class_code:', class_code)
        print('week:', week)
        print('word:')
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(word)

        raise InternalServerError('An Exception was thrown:  ' + str(f))

# Mutator Delete Word
@app.route('/delete_word/<class_code>/<week>', methods=['POST'])
def delete_word(class_code, week):

    try:
        # Convert the transported string into a dictiornary.
        if request.is_json:

            # The transported string is converted into a json object.
            word = request.get_json()

            # S3 update returns an HTTP status code.
            status_code = s3_delete_word(class_code, week, word)

            # Format a resonse with just the status code.
            response = Response(status=status_code)
            return response
        else:
            print('request was NOT json.')
            raise InternalServerError('Request was not in JSON format.')

    except UnicodeDecodeError as e:
        print('UnicodeDecodeError was encountered in add_word')
        raise InternalServerError('An UnicodeDecoderError was thrown while parsing request:  ' + str(e))

    except Exception as f:
        print('\n\nException was thrown in delete_word.')
        print('Exception:', str(f))
        print('class_code:', class_code)
        print('week:', week)
        print('word:')
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(word)

        raise InternalServerError('An Exception was thrown:  ' + str(f))


# S3 Get Classes
def s3_get_classes():

    bucket_name = 'humphries-flashcards'
    
    # This will contained the filtered selection of the contents of the bucket.
    classes = []
    
    ACCESS_KEY_ID_FOR_S3=os.environ['ACCESS_KEY_ID_FOR_S3']
    SECRET_ACCESS_KEY_FOR_S3=os.environ['SECRET_ACCESS_KEY_FOR_S3']
    
    try:
        client = boto3.client('s3', 
                              aws_access_key_id=ACCESS_KEY_ID_FOR_S3, 
                              aws_secret_access_key=SECRET_ACCESS_KEY_FOR_S3)

    except Exception as e:
        print("Exception was thrown:", str(e))
        raise InternalServerError('Exception was thrown:  ' + str(e))

    try:
        response = client.list_objects(Bucket=bucket_name, Prefix="", Delimiter="/")

        for commonPrefix in response["CommonPrefixes"]:
            prefix = commonPrefix["Prefix"].replace('/', '')
            classes.append(prefix)



            # if response_item[0] == 'Contents':
            #     json_objects = response_item[1]
            #     for json_object in json_objects: 
            #         if json_object['Key'].endswith('.json'):
            #             key = json_object['Key']
            #             i = key.find('/')
            #             if i < 0:
            #                 s = key
            #             else:
            #                 s = key[:i]
            #             try:
            #                 classes.index(s)
            #             except ValueError as e:
            #                 classes.append(s)

    except Exception as e:
        print('Exception was thrown:', str(e))
        raise InternalServerError('Exception was thrown:  ' + str(e))
    
    return classes

# S3 Get Weeks
def s3_get_weeks(class_code):

    bucket_name = 'humphries-flashcards'
    
    # This will contained the weeks within a class.
    weeks = []
    
    ACCESS_KEY_ID_FOR_S3=os.environ['ACCESS_KEY_ID_FOR_S3']
    SECRET_ACCESS_KEY_FOR_S3=os.environ['SECRET_ACCESS_KEY_FOR_S3']
    
    try:
        client = boto3.client('s3', 
                              aws_access_key_id=ACCESS_KEY_ID_FOR_S3, 
                              aws_secret_access_key=SECRET_ACCESS_KEY_FOR_S3)
                              
    except Exception as e:
        print('Exception was thrown:', str(e))
        raise InternalServerError('Exception was thrown:  ' + str(e))

    try:

        prefix = class_code + '/'

        response = client.list_objects(Bucket=bucket_name, Prefix=prefix, Delimiter="/")

        for commonPrefix in response["CommonPrefixes"]:

            # Locate the week that is between the first and last forward slashes.
            prefix = commonPrefix["Prefix"]
            i = prefix.find('/')
            j = prefix.rfind('/')
            week = prefix[i+1:j]
            weeks.append(week)

    except Exception as e:
        print('Exception was thrown:', str(e))
        raise InternalServerError('Exception was thrown:  ' + str(e))

    return weeks

# S3 Get Words
def s3_get_words(class_code, week):

    bucket_name = 'humphries-flashcards'
    
    # This will contained the filtered selection of the contents of the bucket.
    words = []
    
    ACCESS_KEY_ID_FOR_S3=os.environ['ACCESS_KEY_ID_FOR_S3']
    SECRET_ACCESS_KEY_FOR_S3=os.environ['SECRET_ACCESS_KEY_FOR_S3']
    
    try:
        client = boto3.client('s3', 
                              aws_access_key_id=ACCESS_KEY_ID_FOR_S3, 
                              aws_secret_access_key=SECRET_ACCESS_KEY_FOR_S3)

    except Exception as e:
        print('Exception was thrown:', str(e))
        raise InternalServerError('Exception was thrown:  ' + str(e))

    prefix = class_code + '/' + week + '/'
    
    try:
        response = client.list_objects(Bucket=bucket_name, Prefix=prefix)

        for content in response["Contents"]:

            key = content["Key"]
   
            if key.endswith('.json'):

                object = client.get_object(Bucket=bucket_name, Key=key)

                body = object["Body"].read().decode('utf8')

                body = json.loads(body)

                if "word_diagram" not in body:
                    body["word_diagram"] = [{"dummy":"dummy"}]

                words.append(body)

    except Exception as e:
        print('Exception was thrown:', str(e))

        raise InternalServerError('Exception was thrown:  ' + str(e))

    return words

# S3 Add Word
def s3_upload_word(class_code, week, word):

    bucket_name = 'humphries-flashcards'

    word_spelling = word["word_spelling"]

    key = class_code + '/' + week + '/' + word_spelling + '.json'

    # Convert the json object into a string.
    word = json.dumps(word)

    # Convert the string into a byte stream.
    word = str.encode(word)
    
    ACCESS_KEY_ID_FOR_S3=os.environ['ACCESS_KEY_ID_FOR_S3']
    SECRET_ACCESS_KEY_FOR_S3=os.environ['SECRET_ACCESS_KEY_FOR_S3']
    
    try:
        client = boto3.client('s3', 
                              aws_access_key_id=ACCESS_KEY_ID_FOR_S3, 
                              aws_secret_access_key=SECRET_ACCESS_KEY_FOR_S3)

        client.put_object(Body=word, Bucket=bucket_name, Key=key)

    except Exception as e:
        print('Exception was thrown in s3_upload_word:', str(e))
        print('bucket_name:', bucket_name)
        print('class_code:', class_code)
        print('week:', week)
        print('key:', key)
        print('word:')
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(word)

        raise InternalServerError('Exception was thrown:  ' + str(e))

    return 200

# S3 Delete Word
def s3_delete_word(class_code, week, word):

    bucket_name = 'humphries-flashcards'

    word_spelling = word["word_spelling"]

    key = class_code + '/' + week + '/' + word_spelling + '.json'

    # Convert the json object into a string.
    word = json.dumps(word)

    # Convert the string into a byte stream.
    word = str.encode(word)
    
    ACCESS_KEY_ID_FOR_S3=os.environ['ACCESS_KEY_ID_FOR_S3']
    SECRET_ACCESS_KEY_FOR_S3=os.environ['SECRET_ACCESS_KEY_FOR_S3']
    
    try:
        client = boto3.client('s3', 
                              aws_access_key_id=ACCESS_KEY_ID_FOR_S3, 
                              aws_secret_access_key=SECRET_ACCESS_KEY_FOR_S3)

        client.delete_object(Bucket=bucket_name, Key=key)

    except Exception as e:
        print('Exception was thrown in s3_add_word:', str(e))
        print('bucket_name:', bucket_name)
        print('class_code:', class_code)
        print('week:', week)
        print('key:', key)
        print('word:')
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(word)

        raise InternalServerError('Exception was thrown:  ' + str(e))

    return 200

# Accessor Next Word
# @app.route("/next_word/<word_spelling>", methods=['GET'])
# def next_word(word_spelling):

#     word = database_get_next_word(word_spelling)

#     status_code = word["status_code"]

#     # Convert the dictionary into a json string.
#     word = json.dumps(word)

#     # Return a response.
#     response = Response(word, status=status_code, mimetype='application/json')
#     return response

# Connect to a Postgres database depending on location.
# def connect_to_postgres():
#     hostname = socket.gethostname()
#     conn = None
#     try:
#         if (hostname == 'XPS'):
#             conn = psycopg2.connect(os.environ['LOCAL_POSTGRES'])
#         elif (hostname == 'DESKTOP-S08TN4O'): 
#             conn = psycopg2.connect(os.environ['LOCAL_POSTGRES'])
#         else:
#             conn = psycopg2.connect(os.environ['AWS_POSTGRES'])
#         return conn
#     except Exception as e:
#         raise InternalServerError('Could not make database connection.')

# Database get first word.
# def database_get_first_word():

#     word = dict()

#     sql = "select "
#     sql += "word_spelling, "
#     sql += "word_type, "
#     sql += "word_definition, "
#     sql += "word_example, "
#     sql += "word_attempts, "
#     sql += "word_correct, "
#     sql += "word_wrong, "
#     sql += "word_percentage "
#     sql += "from viterbi.vocabulary "
#     sql += "where word_spelling = (select min(word_spelling) from viterbi.vocabulary)"

#     conn = None
#     try:
#         conn = connect_to_postgres()
#         cur = conn.cursor()
#         cur.execute(sql)
#         row = None
#         row = cur.fetchone()

#         if row == None:
#             word["wordSpelling"] = ""
#             word["wordGrammar"] = ""
#             word["wordDefinition"] = ""
#             word["wordExample"] = ""
#             word["wordAttempts"] = 0
#             word["wordCorrect"] = 0
#             word["wordWrong"] = 0
#             word["wordPercentage"] = 0.0
#             word["status_code"] = 404
#         else:
#             word["wordSpelling"] = row[0]
#             word["wordGrammar"] = row[1]
#             word["wordDefinition"] = row[2]
#             word["wordExample"] = row[3]
#             word["wordAttempts"] = row[4]
#             word["wordCorrect"] = row[5]
#             word["wordWrong"] = row[6]
#             word["wordPercentage"] = row[7]
#             word["status_code"] = 200

#     except Exception as e:
#         print('Exception was thrown:', str(e))
#         raise InternalServerError('Exception was thrown:  ' + str(e))

#     except psycopg2.DatabaseError as e:
#         print('DatabaseError was thrown:', str(e))
#         raise InternalServerError('A database error occurred:  ' + str(e))

#     finally:
#         if conn is not None:
#             conn.close()
    
#     return word

# Database get next word.
# def database_get_next_word(word_spelling):

#     word = dict()

#     sql = "select "
#     sql += "word_spelling, "
#     sql += "word_type, "
#     sql += "word_definition, "
#     sql += "word_example, "
#     sql += "word_attempts, "
#     sql += "word_correct, "
#     sql += "word_wrong, "
#     sql += "word_percentage "
#     sql += "from viterbi.vocabulary "
#     sql += "where word_spelling = ("
#     sql += "    select next_word_spelling "
#     sql += "    from viterbi.next_word_spelling "
#     sql += "    where word_spelling = %s) "

#     conn = None
#     try:
#         conn = connect_to_postgres()
#         cur = conn.cursor()
#         cur.execute(sql, (word_spelling,))

#         row = None
#         row = cur.fetchone()

#         if row == None:
#             word["wordSpelling"] = ""
#             word["wordGrammar"] = ""
#             word["wordDefinition"] = ""
#             word["wordExample"] = ""
#             word["wordAttempts"] = 0
#             word["wordCorrect"] = 0
#             word["wordWrong"] = 0
#             word["wordPercentage"] = 0.0
#             word["status_code"] = 404
#         else:
#             word["wordSpelling"] = row[0]
#             word["wordGrammar"] = row[1]
#             word["wordDefinition"] = row[2]
#             word["wordExample"] = row[3]
#             word["wordAttempts"] = row[4]
#             word["wordCorrect"] = row[5]
#             word["wordWrong"] = row[6]
#             word["wordPercentage"] = row[7]
#             word["status_code"] = 200

#     except Exception as e:
#         print('Exception was thrown:', str(e))
#         raise InternalServerError('Exception was thrown:  ' + str(e))

#     except psycopg2.DatabaseError as e:
#         print('DatabaseError was thrown:', str(e))
#         raise InternalServerError('A database error occurred:  ' + str(e))

#     finally:
#         if conn is not None:
#             conn.close()
    
#     return word

# Determine if running on home workstation, laptop, or from a deployment server.
if __name__ == "__main__":
    hostname = socket.gethostname()
    bootstrap = Bootstrap(app)
    moment = Moment(app)
    
    if (hostname == 'XPS'):
        app.run(debug=True)
    elif (hostname == 'DESKTOP-S08TN4O'):  
        app.run(debug=True)
    else:
        from os import environ
        app.run(debug=False, host='0.0.0.0', port=int(environ.get("PORT", 5000)))


    