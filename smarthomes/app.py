#Create Flask Server which listens to get requests and responds
from flask import Flask, redirect, url_for, render_template, request
app=Flask(name)

@app.route("/")
def main  ():
  return "Hi Welcome to our Flask Data Server"

@app.route("/getAllData",methods=["POST","GET"])
def getAllData  ():
    return "Test Sensor=1"

@app.route("/insertData",methods=["POST","GET"])
def insertData ():
  if request.method=="POST":
    inputData=request.form["dataInput"]
    print(inputData)
    return "Received"

  else:
    return "No Data"

if name == "main":
  app.run(debug=True,host="0.0.0.0",port=9090)

resp = req.get("http://192.168.2.26:9090")
print(resp)