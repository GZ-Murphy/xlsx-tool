from unlock_xls import unlock
from del_column import ddddd
import argparse
import os

if __name__=='__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('-i',default=r'E:\xlsx-tool\input\2022-05-01-1111.xls')
    ap.add_argument('-p',default='QH2022@@')
    ap.add_argument('-o',default='temp')
    ap.add_argument('-ci',default=1)
    ap.add_argument('-cnum',default=14)
    args = ap.parse_args()
    in_path = args.i
    splitted = str(in_path).split(os.sep)[:-1]
    fileName = str(in_path).split(os.sep)[-1]
    ss = ''
    for s in splitted:
        ss+=s+os.sep
    out_xls_path = ss+args.o+'_'+fileName
    print(in_path)
    unlock(in_path,args.p,out_xls_path)
    # ddddd(out_xls_path+'x',args.ci,args.cnum)
    # os.remove(out_xls_path)