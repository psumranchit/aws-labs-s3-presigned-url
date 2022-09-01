import json
import boto3
import os
from random import *
import datetime

def lambda_handler(event, context):
    # TODO implement
    rx = randint(10000,99999)
    dx = datetime.datetime.now()
    s3 = boto3.client("s3")
    bucketname = os.environ['bucket']
    keyname = str(dx.year) + "-" + str(dx.month) + "-" + str(dx.day) + "/" + str(rx) + "-" + event['file']
    redirect_url = os.environ['redirect']

    
    URL = s3.generate_presigned_post(
        bucketname, keyname, Fields=None, Conditions=[{'success_action_redirect': redirect_url}], ExpiresIn=300
    )
    
    return {
        "statusCode" : 200,
        "url" : URL['url'],
        "key" : URL['fields']['key'],
        "accid" : URL['fields']['AWSAccessKeyId'],
        "xamztoken" : URL['fields']['x-amz-security-token'],
        "plc" : URL['fields']['policy'],
        "sig" : URL['fields']['signature']
    }
    