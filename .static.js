module.exports = {
    port: 9323,
    proxy: [
        '/hotel/ajax/HotelAjaxCall.aspx~https://www.ly.com/',
        '/wolfforms/formcommon/ClientFormConfig/GetClientFormConfig~http://10.100.158.210:812',
        '/_upload~http://10.100.158.183:8082',
        '/wolfforms/FoundationCommon/DepartListTree~http://10.101.32.61:812',
        '/wolfforms/FoundationCommon/GetEmployee~http://10.101.32.61:812',
        '/wolfforms/FileCommon/UploadFile~http://10.101.32.61:812'
    ]
}