$(document).ready(function () {
  const minPrice = $('#minPriceField');
  const minPriceList = $('.minPrice-list');
  const maxPrice = $('#maxPriceField');
  const maxPriceList = $('.maxPrice-list');
  const priceBtnDp = $('#priceDropDown');
  const ppty = $(".property-item input[type=checkbox]");
  const bedBtns = $('.bedroom-btns button:not(.d-none)');
  const bedBtnDp = $('#bedsDropDown');
  const minBeds = $("#minBedsField");
  const maxBeds = $("#maxBedsField");
  // const bedDpDwn = $(".beds-dpdwn");

  // stop dropdown from closing when the menu is clicked
  $('.dropdown-menu').on({
    "click": function (e) {
      e.stopPropagation();
    }
  });

  // Open minimum price dropdown list on field focus
  minPrice.focus(e => {
    maxPriceList.addClass('d-none');
    minPriceList.removeClass('d-none');
  });

  // Open maximum price dropdown list on field focus
  maxPrice.focus(e => {
    minPriceList.addClass('d-none');
    maxPriceList.removeClass('d-none');
  });

  function swapPrice() {
    console.log("max: " + maxPrice.val());
    console.log("min: " + minPrice.val());
    if (maxPrice.val() !== "" && minPrice.val() !== "" 
    && (parseFloat(maxPrice.val()) < parseFloat(minPrice.val()))) {
      var temp = maxPrice.val();
      maxPrice.val(minPrice.val());
      minPrice.val(temp);
    }
    // console.log(maxPrice.val() !== "" && minPrice.val() !== "" && (maxPrice.val() < minPrice.val()));
  }

  minPrice.on('change', function (e) {
    swapPrice();
    var minpr = minPrice.val();
    var maxpr = maxPrice.val();
    if (maxpr != "")
      priceBtnDp.text("Max $" + maxpr);
    else if (minpr != "" && maxpr == "")
      priceBtnDp.text("Min $" + minpr);
    else
      priceBtnDp.text("Price");
  });

  maxPrice.on('change', function (e) {
    swapPrice();
    var minpr = minPrice.val();
    var maxpr = maxPrice.val();
    if (maxpr != "")
      priceBtnDp.text("Max $" + maxpr);
    else if (minpr != "")
      priceBtnDp.text("Min $" + minpr);
    else
      priceBtnDp.text("Price");
  });

  // Change Price button text on minimum price change
  $(".minPrice-list .list-group-item").click(function () {
    var minpr = $(this).attr('data-value');
    minPrice.val(minpr).change();
  });

  // Change Price button text on maximum price change
  $(".maxPrice-list .list-group-item").click(function () {
    var maxpr = $(this).attr('data-value');
    maxPrice.val(maxpr).change();
  });

  // Make changes to checkboxes
  ppty.on('change', function (e) {
    var $this = $(e.target);
    var allChecked = true;
    // disable every other checkbox if 'Any' checkbox is selected
    if ($this.attr('id') === 'anyProperty') {
      enableAnyChkbox();
    } else {
      $('#anyProperty').prop('checked', false);
      // check if all checkboxes except 'any' are selected.
      ppty.each(function (idx, item) {
        var $item = $(item);
        if (!$item.prop('checked') && $item.attr('id') !== 'anyProperty')
          allChecked = false;
      });
      // if all checkboxes are selected, disable them and enable the 'any' checkbox
      // or enable 'any' checkbox if none are selected
      if (allChecked || !ppty.is(":checked")) {
        enableAnyChkbox();
      }
    };
  });

  // Enable 'any' checkbox and disable the rest
  function enableAnyChkbox() {
    ppty.each(function (idx, item) {
      var $item = $(item);
      $item.prop('checked', false);
    });
    $("#anyProperty").prop('checked', true);
  };

  //change bedroom choice on click
  bedBtns.click(function () {
    $('.bedroom-btns button.active').removeClass('active');
    $(this).addClass('active');
    var selTxt = $(this).text();
    // change button text and field value
    if ($(this).text() === "Any") {
      bedBtnDp.text("Beds");
      minBeds.val("any");
    } else {
      bedBtnDp.text(selTxt + " Beds");
      var selVal = $(this).attr('data-value');
      minBeds.val(selVal);
    };
    maxBeds.val("any");
  });

  // On min beds option change
  minBeds.on('change', function (e) {
    var minVal = minBeds.val();
    var maxVal = maxBeds.val();
    var selBtn = $('.bedroom-btns button[data-value=' + minVal + ']');
    var prevBtn = $('.bedroom-btns button.active');
    // swap minimum and maximum values 
    // if minimum is more than max
    // if max is set as studio while min is not set as studio
    if ((maxVal !== "any" && maxVal !== "studio" && minVal !== "any" &&
        minVal !== "studio" && minVal > maxVal) ||
      (maxVal === "studio" && minVal !== "any" && minVal !== "studio")) {
      minBeds.val(maxVal)
      maxBeds.val(minVal);
    } else if (minVal !== "studio" && maxVal !== "studio") {
      prevBtn.removeClass('active');
      selBtn.addClass('active');
    }
    // change button text based on minimum and maximum values
    minVal = minBeds.val();
    maxVal = maxBeds.val();
    // if max is any
    if (maxVal === "any") {
      if (minVal === "any")
        bedBtnDp.text("Beds");
      else if (minVal === "studio")
        bedBtnDp.text("Studio Plus");
      else
        bedBtnDp.text(selBtn.text() + " Beds");
      // if max is studio
    } else if (maxVal === "studio") {
      if (minVal === "any" || minVal === "studio")
        bedBtnDp.text("Studio Only");
      // if max is a number
    } else {
      if (minVal === "studio")
        bedBtnDp.text("Studio - " + maxVal + " Beds");
      else if (minVal === "any")
        bedBtnDp.text("Any - " + maxVal + " Beds");
      else
        bedBtnDp.text(minVal + " - " + maxVal + " Beds");
    }
    // remove active button if dropdown text contains studio
    if (bedBtnDp.text().includes("tudio")) {
      $('.bedroom-btns button.active').removeClass("active");
      $('.bedroom-btns button.d-none').addClass("active");
    }
  });

  // On min beds option change
  maxBeds.on('change', function (e) {
    var minVal = minBeds.val();
    var maxVal = maxBeds.val();
    // if max is none
    if (maxVal === "any") {
      if (minVal === "any") {
        bedBtnDp.text("Beds");
        $('.bedroom-btns button.active').removeClass("active");
        $('.bedroom-btns button[data-value=any]').addClass("active");
      } else if (minVal === "studio")
        bedBtnDp.text("Studio Plus");
      else
        bedBtnDp.text(minVal + "+ Beds");
      // if max is studio
    } else if (maxVal === "studio") {
      if (minVal === "any" || minVal === "studio")
        bedBtnDp.text("Studio Only");
      else {
        minBeds.val(maxVal);
        maxBeds.val(minVal);
        bedBtnDp.text("Studio - " + minVal + " Beds");
      }
      // if max is a number
    } else {
      if (minVal === "any") {
        bedBtnDp.text("Any - " + maxVal + " Beds");
        $('.bedroom-btns button.active').removeClass("active");
        $('.bedroom-btns button[data-value=any]').addClass("active");
      } else if (minVal === "studio")
        bedBtnDp.text("Studio - " + maxVal + " Beds");
      else {
        if (maxVal < minVal) {
          maxBeds.val(minVal);
          minBeds.val(maxVal).change();
          minVal = minBeds.val();
          maxVal = maxBeds.val();
        }
        bedBtnDp.text(minVal + " - " + maxVal + " Beds");
      }
    }
    // remove active button if dropdown text contains studio
    if (bedBtnDp.text().includes("tudio")) {
      $('.bedroom-btns button.active').removeClass("active");
      $('.bedroom-btns button.d-none').addClass("active");
    }
  });
});