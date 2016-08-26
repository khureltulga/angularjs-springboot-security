angular
  .module('altairApp')
  .controller("applicationCtrl", [
    '$scope',
    '$rootScope',
    '$state',
    '$timeout',
    function($scope, $rootScope, $state, $timeout) {
      if ($rootScope.authenticated) {
        $scope.pmenuGrid = {
          dataSource: {

            transport: {
              read: {
                url: "/api/applications",
                contentType: "application/json; charset=UTF-8",
                type: "GET"
              },
              update: {
                url: "/api/applications",
                contentType: "application/json; charset=UTF-8",
                type: "PUT"
              },
              destroy: {
                url: "/api/applications",
                contentType: "application/json; charset=UTF-8",
                type: "DELETE",
                complete: function(e) {
                  $("#notificationDestroy").trigger('click');
                }
              },
              create: {
                url: "/api/applications",
                contentType: "application/json; charset=UTF-8",
                type: "POST",
                complete: function(e) {
                  $("#notificationSuccess").trigger('click');
                  $(".k-grid").data("kendoGrid").dataSource.read();
                }
              },
              parameterMap: function(options, operation) {
                //console.log(operation);
                if (operation == "update" || operation == "destroy" || operation == "create") {
                  return JSON.stringify(options);
                } else if (operation == "read"){
                  //console.log(options);
                  var paging = {
                    size: options.pageSize,
                    number: options.page
                  };
                  if (options.sort != null && options.sort.length > 0) {
                	  paging.sort = options.sort[0].field + "," + options.sort[0].dir;
                  }
                  
                  if (options.filter != null && options.filter.filters.length > 0) {
                	  paging.search = '';
                	  for(i=0;i<options.filter.filters.length;i++){
                		  paging.search = paging.search + options.filter.filters[i].field + ":" + options.filter.filters[i].value;
                		  if (i != options.filter.filters.length - 1){
                			  paging.search = paging.search + ",";
                		  }
                	  }
                  }
                	/*var pageSize = options.pageSize;
                    var page = options.page - 1;
                    var skip = options.skip;
                    var take = options.take;
                    var sort = options.sort;
                    var filter = options.filter;
                    var sortParam;

                    var root = '';
                    var url;

                    //Pagination
                    url = 'page=' + page + '&size=' + pageSize;

                    //Sort Information
                    if (sort && sort.length > 0) {
                      sortParam = sort[0]['field'] + ',' + sort[0]['dir'];
                      url = url + '&sort=' + sortParam;
                    }

                    //Filter Information
                    if (filter && filter.filters.length > 0) {
                      var filterParam;
                      var elt = filter.filters[0];
                      filterParam = elt['field'] + ':' + elt['value'];
                      for (var index = 1; index < filter.filters.length; index++) {
                        elt = filter.filters[index];
                        var field = elt['field'];
                        var operator = elt['operator'];
                        var value = elt['value'];
                        var capitalizedFiled = field[0].toUpperCase() + field.substr(1);

                        filterParam = filterParam + ',' + field + ':' + value;

                      }
                      if (typeof sortParam !== 'undefined') {
                        url = root + 'search=' + filterParam + '&sort=' + sortParam;
                      } else {
                        url = root + 'search=' + filterParam;
                      }
                      console.log('filterParam ' + url);
                    }

                  return url;*/
                	return paging;
                }
              }
            },

            schema: {
              data: "data",
              total: "total",
              model: {
                id: "id",
                fields: {
                  id: {
                    editable: false,
                    nullable: true
                  },
                  name: {
                    type: "string",
                    validation: {
                      required: true
                    }
                  },
                  description: {
                    type: "string",
                    validation: {
                      required: true
                    }
                  },
                  image: {
                    type: "string",
                    validation: {
                      required: true
                    }
                  },
                  url: {
                    type: "string",
                    validation: {
                      required: true
                    }
                  }
                }
              }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
          },
          filterable: {
              mode: "row"
          },
          sortable: true,
          columnMenu: false,
          resizable: true,
          toolbar: ["create"],
          pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
          },
          columns: [{
            field: "name",
            title: "Нэр",
            filterable: {
                cell: {showOperators: false}
            }
          }, {
            field: "description",
            title: "Тайлбар",
            editor: function(container, options) {
              $('<textarea md-input textarea-autosize cols="30" rows="4" class="md-input" data-bind="value: ' + options.field + '"></textarea>').appendTo(container);
            },
            filterable: {
                cell: {showOperators: false}
            }
          }, {
            field: "image",
            title: "Зураг",
            template: '<img src="#= image #" alt="image" />',
            width: "100px",
            filterable :false
          }, {
            field: "url",
            title: "URL",
            template: '<a href="#= url #" target="_blank">#= url #</a>',
            filterable: {
                cell: {showOperators: false}
            }
          }, {
            command: ["edit", "destroy"],
            title: "&nbsp;",
            width: "235px"
          }],
          editable: "popup"
        }
      } else {
        $state.go('login');
      }

    }
  ]);