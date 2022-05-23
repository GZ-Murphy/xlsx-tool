import msoffcrypto
import win32com.client as win32
import os

def unlock(filename, pwds,out_path):
    temp = open(filename,'rb')
    excel = msoffcrypto.OfficeFile(temp)
    passwords  = str(pwds).split(',')
    for password in passwords:
        print(password)
        try:
            excel.load_key(password)
            with open(out_path,'wb') as f:
                excel.decrypt(f)
        except:
            print("pw wrong")
        else:
            temp.close()
            toX(out_path)
            os.remove(out_path)
            break

    # temp = open(filename,'rb')
    # excel = msoffcrypto.OfficeFile(temp)
    # excel.load_key(pwd)
    # with open(out_path,'wb') as f:
    #     excel.decrypt(f)
    # temp.close()
    # toX(out_path)
    
   
    
def toX(filePath:str):
    excel = win32.gencache.EnsureDispatch('Excel.Application')
    wb = excel.Workbooks.Open(filePath)
    # 51是.xlsx格式
    # 56是.xls格式
    wb.SaveAs(filePath + "x", FileFormat=51)
    wb.Close()
    excel.Application.Quit()

if __name__=='__main__':
    unlock('1.xls','QH2022@@',r'D:\Terry\MurpyTest\out.xls')