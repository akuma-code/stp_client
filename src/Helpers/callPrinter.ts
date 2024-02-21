export function CallPrint(strid: string) {
    const prtContent = document.getElementById(strid);
    const WinPrint = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
    if (!prtContent || !WinPrint) return console.log(prtContent, WinPrint, "not found! ")
    WinPrint.document.write('');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write('');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
    //   prtContent.innerHTML=strOldOne;
}