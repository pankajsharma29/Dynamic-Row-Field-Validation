var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.error = false;
    $scope.successMessage = false;
    $scope.empData = {
    	'empId' : '',
    	'records' : [
        {
          'firstName' : '',
          'lastName' : '',
          'salary' : ''
        },{
          'firstName' : '',
          'lastName' : '',
          'salary' : ''
        },{
          'firstName' : '',
          'lastName' : '',
          'salary' : ''
        }]
    };
    
    $scope.onSubmit = function () {
        resetMessages();        
        validateFormFields();
    };
    
    $scope.deleteRows = function (rowId) {
    	$scope.empData.records[rowId] = {
        	'firstName' : '',
            'lastName' : '',
            'salary' : ''
        }
    };
    
    var isvalidEmpId = function () {
    	if ($scope.empData.empId === "" ) {
            //console.log(result.ERROR_MESSAGES.EMP_ID.code);
        	$scope.errorMessages[result.ERROR_MESSAGES.EMP_ID.code] = result.ERROR_MESSAGES.EMP_ID.message;
            $scope.error = true;
        }
    }
    
    var validateFormFields = function () {
    	isvalidEmpId();
        var rowsCount = 0;
        var employeeData = $scope.empData.records;
        
        for (var i = 0; i < employeeData.length; i++) {
        	// non-empty
            if (hasOneOrMoreRowsData(employeeData[i])) {
            // missing required rows data
            	if (!hasAllRequiredRowsData(employeeData[i])) {
                    $scope.errorMessages[result.ERROR_MESSAGES.INVALID_ROWS.code + (i + 1)] = "Records [" + (i + 1) + "] : "+ result.ERROR_MESSAGES.INVALID_ROWS.message;
                    $scope.error = true;
                    $scope.successMessage = false;
                } else {
                    $scope.error = false;
                    console.log("data is saved");
                    $scope.successMessage = true;
                }
            } else {
                // empty rows
            	rowsCount++;
            	//$scope.error = false;
            }
        }
        
        if (rowsCount === employeeData.length) {
              $scope.errorMessages[result.ERROR_MESSAGES.MISSING_ONE_OR_MORE_ROWS.code] =
                    result.ERROR_MESSAGES.MISSING_ONE_OR_MORE_ROWS.message;
                    $scope.error = true;
                    $scope.successMessage = false;
            }
    	
    }
    
     function resetMessages () {
        // reset error messages
        $scope.errorMessages = {};
        $scope.error = false;
            
     }
     
     function hasOneOrMoreRowsData (emp) {
        return !!(emp.firstName || emp.lastName || emp.salary );
     }

  	function hasAllRequiredRowsData (emp) {
    	return !!(emp.firstName && emp.lastName && emp.salary);
  	}
});