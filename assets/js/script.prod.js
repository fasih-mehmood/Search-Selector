"use strict";$(document).ready(function(){var a=$("#minPriceField"),e=$(".minPrice-list"),o=$("#maxPriceField"),n=$(".maxPrice-list"),i=$("#priceDropDown"),d=$(".property-item input[type=checkbox]"),t=$(".bedroom-btns button:not(.d-none)"),s=$("#bedsDropDown"),c=$("#minBedsField"),u=$("#maxBedsField");function r(){d.each(function(t,e){$(e).prop("checked",!1)}),$("#anyProperty").prop("checked",!0)}$(".dropdown-menu").on({click:function(t){t.stopPropagation()}}),a.focus(function(t){n.addClass("d-none"),e.removeClass("d-none")}),o.focus(function(t){e.addClass("d-none"),n.removeClass("d-none")}),$(".minPrice-list .list-group-item").click(function(){var t=$(this).attr("data-value"),e=o.attr("value");a.attr("value",t),""!=e&&null!=e?i.text("Max $"+e):""==t||""!=e&&null!=e?i.text("Price"):i.text("Min $"+t)}),$(".maxPrice-list .list-group-item").click(function(){var t=$(this).attr("data-value"),e=a.attr("value");o.attr("value",t),""!=t?i.text("Max $"+t):""!=e?i.text("Min $"+e):i.text("Price")}),d.on("change",function(t){var e=$(t.target),o=!0;"anyProperty"===e.attr("id")?r():($("#anyProperty").prop("checked",!1),d.each(function(t,e){var a=$(e);a.prop("checked")||"anyProperty"===a.attr("id")||(o=!1)}),!o&&d.is(":checked")||r())}),t.click(function(){$(".bedroom-btns button.active").removeClass("active"),$(this).addClass("active");var t,e=$(this).text();"Any"===$(this).text()?(s.text("Beds"),c.val("any")):(s.text(e+" Beds"),t=$(this).attr("data-value"),c.val(t)),u.val("any")}),c.on("change",function(t){var e=c.val(),a=u.val(),o=$(".bedroom-btns button[data-value="+e+"]"),n=$(".bedroom-btns button.active");"any"!==a&&"studio"!==a&&"any"!==e&&"studio"!==e&&a<e||"studio"===a&&"any"!==e&&"studio"!==e?(c.val(a),u.val(e)):"studio"!==e&&"studio"!==a&&(n.removeClass("active"),o.addClass("active")),e=c.val(),"any"===(a=u.val())?"any"===e?s.text("Beds"):"studio"===e?s.text("Studio Plus"):s.text(o.text()+" Beds"):"studio"===a?"any"!==e&&"studio"!==e||s.text("Studio Only"):"studio"===e?s.text("Studio - "+a+" Beds"):"any"===e?s.text("Any - "+a+" Beds"):s.text(e+" - "+a+" Beds"),s.text().includes("tudio")&&($(".bedroom-btns button.active").removeClass("active"),$(".bedroom-btns button.d-none").addClass("active"))}),u.on("change",function(t){var e=c.val(),a=u.val();"any"===a?"any"===e?(s.text("Beds"),$(".bedroom-btns button.active").removeClass("active"),$(".bedroom-btns button[data-value=any]").addClass("active")):"studio"===e?s.text("Studio Plus"):s.text(e+"+ Beds"):"studio"===a?"any"===e||"studio"===e?s.text("Studio Only"):(c.val(a),u.val(e),s.text("Studio - "+e+" Beds")):"any"===e?(s.text("Any - "+a+" Beds"),$(".bedroom-btns button.active").removeClass("active"),$(".bedroom-btns button[data-value=any]").addClass("active")):"studio"===e?s.text("Studio - "+a+" Beds"):(a<e&&(u.val(e),c.val(a).change(),e=c.val(),a=u.val()),s.text(e+" - "+a+" Beds")),s.text().includes("tudio")&&($(".bedroom-btns button.active").removeClass("active"),$(".bedroom-btns button.d-none").addClass("active"))})});