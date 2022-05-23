import openpyxl


def ddddd(xlsx_path:str,d_start:int,d_num:int):
    # if column_idx_list is None:
    #     column_idx_list = list(range(1,15))
    wb=openpyxl.load_workbook(xlsx_path)
    st = wb[wb.sheetnames[0]]
    # column_idx_list.reverse()
    # for co in column_idx_list:
    #     st.delete_cols(1,14)
    st.delete_cols(d_start+1,d_num)
    wb.save(xlsx_path)

    

if __name__=='__main__':
    column_idx_list = list(range(1,15))
    column_idx_list.reverse()
    print(column_idx_list)