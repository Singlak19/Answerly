import pandas as pd
dataste=pd.read_csv('temp.csv', index_col=0)
dataste
import numpy as np
dataset=pd.DataFrame(np.array([[1,2],[3,4]]))
dataset.to_csv('temp.csv')
import os
os.remove('temp.csv')
print(round(2.78,1))
print(int(2.7))
