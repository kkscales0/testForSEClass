  $(function () {
      $("#dialog").igDialog({
          state: "closed",
          modal: true,
          draggable: false,
          resizable: false,
          height: "350px",
          width: "290px"
      });
      $.getJSON('http://owlrepair-148215.appspot.com/api/request/getAllUnassigned', function (data) {
          $("#grid").igGrid({
              dataSource: data.REQUESTS, //JSON Array defined above
              features: [{
                  name: 'Selection',
                  mode: 'row',
                  rowSelectionChanged: function (evt, ui) {

                      var rows = $("#grid").igGridSelection("selectedRow");
                      var dataRow = $('#grid').data('igGrid').dataSource.dataView()[rows.index];
                      console.log(dataRow);
                      $("#currentId").html("" + dataRow.REQUEST_ID);
                      $("#currentCat").html("" + dataRow.CATEGORY_DESC);
                      $("#currentBuilding").html("" + dataRow.BUILDING_DESC);
                      $('#currentPriority').html("" + dataRow.PRIORITY_DESC);
                      $('#currentCampus').html("" + dataRow.CAMPUS_DESC);
                      $('#currentDesc').html("" + dataRow.LOC_DESC);
                      $("#currentCom").html("" + dataRow.DESC);
                      $("#currentStatus").html("" + dataRow.STATUS_DESC);
                      $('#currentImage').attr('src', '/uploads/' + dataRow.IMAGE_PATH);
                      $("#dialog").igDialog("open");

                  }
              }]
          });
      });

  });

  function toggleCurrentRowOfGrid(grid) {
      // get reference to current selected row
      var row = $(grid).igGridSelection("selectedRow");
      if (row) {
          // toggle row
          $("#grid").igHierarchicalGrid("toggle", row.element);
      }
  }

  function toggleCurrentRowOfRootGrid() {
      // get the top level grid
      var parentGrid = $("#grid").igHierarchicalGrid("root");
      toggleCurrentRowOfGrid(parentGrid);
  }