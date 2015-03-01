import pandas as pd
import json
from pprint import pprint

df = pd.read_csv('data/F-F_Factors_new.csv')
headers = list(df.columns.values)[1:]
date_col = df['Date'].tolist()

date_col = [str(x) for x in date_col]
date_col = ['%s-%s-%s' % (x[:4],x[4:6],x[6:]) for x in date_col]

d = {}

for column_name in headers:
    col = df[column_name].tolist()
    d[column_name] = [[date, val] for date, val in zip(date_col, col)]

with open('data/F-F_Factors.json', 'w') as outfile:
    json.dump(d, outfile, indent=4, separators=(',', ': '))



