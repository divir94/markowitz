import pandas as pd
import json
from pprint import pprint

df = pd.read_csv('F-F_Factors.csv')
headers = list(df.columns.values)[1:]
date_col = df['Date'].tolist()

d = {}

for column_name in headers:
    col = df[column_name].tolist()
    d[column_name] = [[date, val] for date, val in zip(date_col, col)]

with open('F-F_Factors.json', 'w') as outfile:
    json.dump(d, outfile, indent=4, separators=(',', ': '))



