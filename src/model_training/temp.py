import pandas as pd
dataste=pd.read_csv('temp.csv')
dataste
import numpy as np
dataset=pd.DataFrame(np.array([[1,2],[3,4]]))
dataset.to_csv('temp.csv')
import os
os.remove('temp.csv')
