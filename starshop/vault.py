import boto3
import os 
import dotenv

dotenv.load_dotenv()

def upload_files() -> None:
    '''Загрузка default фотографий на s3 хранилище'''
     
    s3 = boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        endpoint_url=os.getenv('AWS_S3_ENDPOINT_URL')
    )
    
    media_path = os.path.join(os.getcwd(), 'media')
    bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME')
    
    for file in os.listdir(media_path):
        local_file_path = os.path.join(media_path, file)
        
        if os.path.isfile(local_file_path):
            try:
                s3 \
                .upload_file(
                    local_file_path, 
                    bucket_name, 
                    f'media/default/{file}'
                    )
            except Exception as e:
                print(e)

upload_files()