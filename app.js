agGrid.initialiseAgGridWithAngular1(angular);
var module = angular.module("app", ['ngMaterial', 'agGrid']);
module.controller("homeController", function ($scope, $mdDialog) {
    $scope.showEmail = true;
    $scope.showMobile = true;
    $scope.showStatus = true;
    $scope.showLabels = true;
    $scope.showNextAction = true;
    $scope.showDocuments = true;
    $scope.showMetadata = true;
    $scope.search = "";

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

    $scope.editLogs=function(m){
        $mdDialog.show({
            template: `<md-dialog language-direction  aria-label="Activities">
            <md-toolbar>
                <div class="md-toolbar-tools">
                    <div>
                        <i class="fa fa-tasks"  aria-hidden="true"></i>
                        Logs Dialog ${m}
                    </div>
                </div>
            </md-toolbar>
        </md-dialog>
        `,  parent: angular.element(document.body),
            clickOutsideToClose: true,
            controller: 'homeController',
          });
    }
    $scope.editMetadata=function(){
        $mdDialog.show({
            template: `<md-dialog language-direction  aria-label="Activities">
            <md-toolbar>
                <div class="md-toolbar-tools">
                    <div>
                        <i class="fa fa-tasks"  aria-hidden="true"></i>
                        Edit Metadata
                    </div>
                </div>
            </md-toolbar>
        </md-dialog>
        `,  parent: angular.element(document.body),
            clickOutsideToClose: true,
            controller: 'homeController',
          });
    }

    $scope.columnDefs = [
        {
            headerName: "", headerCheckboxSelection: true,
            checkboxSelection: true, headerComponentParams: { template: '<i class="fa fa-bars fa-lg"></i>' }, cellRenderer: () => "<i class='fa fa-bars fa-lg' style='color:#4A9ED7;' class='' ng-click='editLogs(message)'></i><select style='background-color:white;width:10px;border:none;height:auto;><option value='fa fa-bars fa-lg'></option><option>one</option><option>two</option><option>three</option><option>four</option></select>", field: "menu", width: 100, sortable: true, checkboxSelection: true
        },
        { headerName: "", cellRenderer: (params) => "<span><i class='fa fa-edit fa-lg' onclick='createLogs()' style='color:#4A9ED7'></i>&nbsp;<i class='fa fa-hashtag fa-lg' onClick='editMetadata()' style='color:#4A9ED7'></i></span>", field: "logs", width: 80, sortable: true },
        { headerName: "Full name", width: 120, field: "fullname", cellStyle: { color: 'blue', textDecoration: 'underline' }, width: 120, sortable: true, filter: true },
        {
            headerName: "Status", field: "status",
            cellRenderer: (params) => {
                $scope.paramValue = params.value;
                console.log({value:params.value});
                return `<test param="paramValue"></test>`
            }, width: 150, sortable: true, filter: true
        }
        ,
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
            headerName: "", headerComponentParams: { template: "<span onclick='editUserField()'>{{test}}<br>(Edit)</span>" }, onCellClicked: () => {  }, field: "userfields1", cellStyle: { color: 'white' }, sortable: true, cellRenderer: () => `
            <md-input-container>
          <label>{{test}}</label>
          <input type="text" ng-model="color" required="" md-maxlength="10">
        </md-input-container>
            `
        },
        {
            headerName: "", headerComponentParams: { template: "<div>my-customer</div>" }, onCellClicked: () => {  }, field: "userfields2", cellStyle: { color: 'white' }, sortable: true, cellRenderer: () => `
            
            <div my-customer></div>
            `
        },
        {
            headerName: "", headerComponentParams: { template: "<span onclick='editUserField()'>{{test}}<br>(Edit)</span>" }, onCellClicked: () => {  }, field: "userfields1", cellStyle: { color: 'white' }, sortable: true, cellRenderer: () => `
            <md-checkbox aria-label="Disabled checkbox" ng-model="data.cb3">
            Checkbox: Disabled
          </md-checkbox>
            `
        },
        {
            headerName: "", headerComponentParams: { template: "<span onclick='editUserField()'>{{test}}<br>(Edit)</span>" }, onCellClicked: () => {  }, field: "userfields1", cellStyle: { color: 'white' }, sortable: true, cellRenderer: () => `
            <md-input-container>
          <label>State</label>
          <md-select ng-model="abc">
            <md-option><em>None</em></md-option>
            <md-option>
              abc
            </md-option>
          </md-select>
        </md-input-container>
            `
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
        getMainMenuItems: getMainMenuItems,
        getContextMenuItems:getContextMenuItems,
        defaultColDefs: { resizable: true },
        rowHeight: 200
    };


    $scope.getSelectedRows = function () {
        const rows = $scope.gridOptions.api.getSelectedRows();
        console.log({ rows });
    }


    var getContextMenuItems = function(params) {
        var result = [
          {
            name: 'Alert ' + params.value,
            action: function() {
              window.alert('Alerting about ' + params.value);
            },
            cssClasses: ['redFont', 'bold'],
          },
          {
            name: 'Always Disabled',
            disabled: true,
            tooltip:
              'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
          },
          {
            name: 'Country',
            subMenu: [
              {
                name: 'Ireland',
                action: function() {
                  console.log('Ireland was pressed');
                },
                icon: 'abc',
              },
              {
                name: 'UK',
                action: function() {
                  console.log('UK was pressed');
                },
                icon: 'abc',
              },
              {
                name: 'France',
                action: function() {
                  console.log('France was pressed');
                },
                icon: 'abc',
              },
            ],
          },
          {
            name: 'Person',
            subMenu: [
              {
                name: 'Niall',
                action: function() {
                  console.log('Niall was pressed');
                },
              },
              {
                name: 'Sean',
                action: function() {
                  console.log('Sean was pressed');
                },
              },
              {
                name: 'John',
                action: function() {
                  console.log('John was pressed');
                },
              },
              {
                name: 'Alberto',
                action: function() {
                  console.log('Alberto was pressed');
                },
              },
              {
                name: 'Tony',
                action: function() {
                  console.log('Tony was pressed');
                },
              },
              {
                name: 'Andrew',
                action: function() {
                  console.log('Andrew was pressed');
                },
              },
              {
                name: 'Kev',
                action: function() {
                  console.log('Kev was pressed');
                },
              },
              {
                name: 'Will',
                action: function() {
                  console.log('Will was pressed');
                },
              },
              {
                name: 'Armaan',
                action: function() {
                  console.log('Armaan was pressed');
                },
              },
            ],
          },
          'separator',
          {
            name: 'Windows',
            shortcut: 'Alt + W',
            action: function() {
              console.log('Windows Item Selected');
            },
            icon: '<img src="../images/skills/windows.png"/>',
          },
          {
            name: 'Mac',
            shortcut: 'Alt + M',
            action: function() {
              console.log('Mac Item Selected');
            },
            icon: '<img src="../images/skills/mac.png"/>',
          },
          'separator',
          {
            name: 'Checked',
            checked: true,
            action: function() {
              console.log('Checked Selected');
            },
            icon: '<img src="../images/skills/mac.png"/>',
          },
          'copy',
          'separator',
          'chartRange',
        ];
        return result;
      }

      $scope.quickSearch = function () {
        $scope.gridOptions.api.setQuickFilter($scope.search);
      }

});




function getMainMenuItems(params) {
    switch (params.column.getId()) {
        case ' ':
            var athleteMenuItems = params.defaultItems.slice(0);
            athleteMenuItems.push({
                name: 'ag-Grid Is Great',
                action: function () {
                    console.log('ag-Grid is great was selected');
                },
            });
            athleteMenuItems.push({
                name: 'Casio Watch',
                action: function () {
                    console.log('People who wear casio watches are cool');
                },
            });
            athleteMenuItems.push({
                name: 'Custom Sub Menu',
                subMenu: [
                    {
                        name: 'Black',
                        action: function () {
                            console.log('Black was pressed');
                        },
                    },
                    {
                        name: 'White',
                        action: function () {
                            console.log('White was pressed');
                        },
                    },
                    {
                        name: 'Grey',
                        action: function () {
                            console.log('Grey was pressed');
                        },
                    },
                ],
            });
            return athleteMenuItems;

        case 'mobile':
            var athleteMenuItems = params.defaultItems.slice(0);
            athleteMenuItems.push({
                name: 'ag-Grid Is Great',
                action: function () {
                    console.log('ag-Grid is great was selected');
                },
            });
            athleteMenuItems.push({
                name: 'Casio Watch',
                action: function () {
                    console.log('People who wear casio watches are cool');
                },
            });
            athleteMenuItems.push({
                name: 'Custom Sub Menu',
                subMenu: [
                    {
                        name: 'Black',
                        action: function () {
                            console.log('Black was pressed');
                        },
                    },
                    {
                        name: 'White',
                        action: function () {
                            console.log('White was pressed');
                        },
                    },
                    {
                        name: 'Grey',
                        action: function () {
                            console.log('Grey was pressed');
                        },
                    },
                ],
            });
            return athleteMenuItems;
    }
}


module.directive('myCustomer', function() {
    return {
      template: `
      
      <md-menu style="color: black">
      <!-- Trigger element is a md-button with an icon -->
      <md-button ng-click="$mdOpenMenu($event)" class="md-icon-button" aria-label="Open sample menu">
        <md-icon md-svg-icon="call:phone"></md-icon>
      </md-button>
      <md-menu-content>
        <md-menu-item><md-button ng-click="doSomething()">Do Something</md-button></md-menu-item>
      </md-menu-content>
     </md-menu>
      `
    };
  });

  module.directive('test', function() {
    return {
      template: `
      {{param}}
      <span ng-if="param == 'Receiving updates'" style='font-size:12px;color:white;padding:4px;background-color:#4A9ED7;border-radius:6px;'>{{param}}</span>
      <span ng-if="param != 'Receiving updates'" style='font-size:12px;color:white;padding:4px;background-color:grey;border-radius:6px;'>{{param}}</span>
      `,
      scope: {
        param: '='
      }
    };
  });
  