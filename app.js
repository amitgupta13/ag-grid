agGrid.initialiseAgGridWithAngular1(angular);
var module = angular.module("app", ['ngMaterial', 'agGrid']);
module.controller("homeController", function ($scope) {
    $scope.showEmail = true;
    $scope.showMobile = true;
    $scope.showStatus = true;
    $scope.showLabels = true;
    $scope.showNextAction = true;
    $scope.showDocuments = true;
    $scope.showMetadata = true;

    $scope.hideEmail = function () {
        $scope.gridOptions.columnApi.setColumnVisible('email', $scope.showEmail);
    }
    $scope.hideMobile = function () {
        $scope.gridOptions.columnApi.setColumnVisible('mobile', $scope.showMobile);
    }
    $scope.hideLabels = function () {
        $scope.gridOptions.columnApi.setColumnVisible('label', $scope.showLabels);
    }
    $scope.hideStatus = function () {
        $scope.gridOptions.columnApi.setColumnVisible('status', $scope.showStatus);
    }
    $scope.hideNextAction = function () {
        $scope.gridOptions.columnApi.setColumnVisible('nextaction', $scope.showNextAction);
    }
    $scope.hideDocuments = function () {
        $scope.gridOptions.columnApi.setColumnVisible('documents', $scope.showDocuments);
    }
    $scope.hideMetadata = function () {
        $scope.columnDefs.forEach(item => {
            if (item.field.indexOf('userfields') > -1) {
                $scope.gridOptions.columnApi.setColumnVisible(item.field, $scope.showMetadata);
            }
        })
    }

    $scope.getSelectedRows = function () {
        console.log({ abc: $scope.gridOptions.api.getSelectedRows() });
    }

    $scope.columnDefs = [
        {
            headerName: "", headerCheckboxSelection: true,
            checkboxSelection: true, headerComponentParams: { template: '<i class="fa fa-bars fa-lg" onclick="getSelectedRows()"></i>' }, cellRenderer: () => "<i class='fa fa-bars fa-lg' style='color:#4A9ED7;' class=''></i><select style='background-color:white;width:10px;border:none;height:auto;><option value='fa fa-bars fa-lg'></option><option>one</option><option>two</option><option>three</option><option>four</option></select>", field: "menu", width: 100, sortable: true, checkboxSelection: true
        },
        { headerName: "", cellRenderer: (params) => "<span><i class='fa fa-edit fa-lg' onclick='createLogs()' style='color:#4A9ED7'></i>&nbsp;<i class='fa fa-hashtag fa-lg' onClick='editMetadata()' style='color:#4A9ED7'></i></span>", field: "logs", width: 80, sortable: true },
        { headerName: "Full name", width: 120, field: "fullname", cellStyle: { color: 'blue', textDecoration: 'underline' }, width: 120, sortable: true, filter: true },
        { headerName: "Status", field: "status", cellRenderer: (params) => params.value == 'Receiving updates' ? "<span style='font-size:12px;color:white;padding:4px;background-color:#4A9ED7;border-radius:6px;'>" + params.value + "</span>" : "<span style='font-size:12px;color:white;padding:4px;background-color:grey;border-radius:6px;'>" + params.value + "</span>", width: 150, sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Mobile number", field: "mobile", width: 140, sortable: true, filter: true },
        {
            headerName: "Label", field: "label", onCellClicked: () => {
                alert('Assign a Label ')
            }, cellStyle: { color: 'blue', textDecoration: 'underline' }, width: 140, sortable: true
        },
        {
            headerName: "Next action", onCellClicked: () => {
                alert('Add Reminder !')
            }, field: "nextaction", cellStyle: { color: 'blue', textDecoration: 'underline' }, sortable: true
        },
        {
            headerName: "Documents", onCellClicked: () => {
                alert('Add Document !')
            }, field: "documents", cellStyle: { color: 'blue', textDecoration: 'underline' }, sortable: true
        },
        {
            headerName: "", headerComponentParams: { template: "<span onclick='editUserField()'>{{test}}<br>(Edit)</span>" }, onCellClicked: () => { alert('User field changed!') }, field: "userfields1", cellStyle: { color: 'white' }, sortable: true, cellRenderer: () => "<select style='background-color:white;width:40%;border:none;'><option>one</option><option>two</option></select>"
        },
        {
            headerName: "", headerComponentParams: { template: "<span onclick='editUserField()'>test2<br>(Edit)</span>" }, onCellClicked: () => { alert('User field changed!') }, field: "userfields2", cellStyle: { color: 'white' }, sortable: true, cellRenderer: () => "<select style='background-color:white;width:40%;border:none;'><option>one</option><option>two</option></select>"
        }
    ];

    $scope.test = 'testing'


    $scope.rowData = [
        { fullname: "Jai", status: "Receiving updates", email: "jai.shukla@unthinkble.co", mobile: "9122332223", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "amit", status: "Not Invited", email: "amit.gupta@daffodilsw.com", mobile: "8122565623", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "Andrew", status: "Not Invited", email: "andrew@gmail.com", mobile: "8786564356", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "Vikas", status: "Receiving updates", email: "vikas@gmail.com", mobile: "996435678", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "Himanshu", status: "Receiving updates", email: "Himanshu@gmail.com", mobile: "976435678", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "John", status: "Not Invited", email: "john@gmail.com", mobile: "9344356784", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "User", status: "Receiving updates", email: "user@gmail.com", mobile: "986435678", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "Jack", status: "Not Invited", email: "jack@gmail.com", mobile: "9456435678", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "Jai", status: "Receiving updates", email: "jai.shukla@unthinkble.co", mobile: "9122332223", label: "Assign tag", nextaction: "Add reminder", documents: 0 },
        { fullname: "amit", status: "Not Invited", email: "amit.gupta@daffodilsw.com", mobile: "8122565623", label: "Assign tag", nextaction: "Add reminder", documents: 0 }
    ];
    $scope.gridOptions = {
        angularCompileRows: true,
        columnDefs: $scope.columnDefs,
        rowData: $scope.rowData,
        context: $scope,
        rowGroup: true,
        paginationPageSize: 20,
        rowSelection: 'multiple',
        pagination: true,
    };

});