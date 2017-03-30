from flask import Flask, render_template
from flask_restful import reqparse, Resource, Api
import json

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    return render_template('index.html')

@app.route("/getPlotCSV")
def getPlotCSV():
    # with open("outputs/Adjacency.csv") as fp:
    #     csv = fp.read()
    csv = '1,2,3\n4,5,6\n'
    return Response(
        csv,
        mimetype="text/csv",
        headers={"Content-disposition":
                 "attachment; filename=db/seed-data/logons.csv"})

if __name__ == '__main__':
    app.run(debug=True)
