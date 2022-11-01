export const paginationConfig = [{
	name: "enabled",
	dataType: "Boolean",
    formDataType: 'boolean',
	defaultVal: true,
	description: "Turn this off if you do not want the pagination widget"
}, {
	name: "type",
	dataType: "String",
    formDataType: 'radio',
    options: ["FIXED_PAGINATION", "INFINITE_SCROLL", "CLICK_N_SCROLL"],
	defaultVal: "CLICK_N_SCROLL",
	description: "Type of pagination: FIXED_PAGINATION or INFINITE_SCROLL or CLICK_N_SCROLL"
}, {
	name: "el",
	dataType: "Element",
    formDataType: 'string',
	defaultVal: null,
	description: "Element in which to render the pagination component"
}, {
	name: "template",
	dataType: "Function",
    formDataType: 'func',
	defaultVal: "defaultVal",
	description: "Customize the look and feel of the pagination by returning your custom HTML string from this function. This function gets 1 parameter: an object that has the pagination information"
}, {
	name: "pageClass",
	dataType: "String",
    formDataType: 'string',
	defaultVal: "UNX-page-items",
	description: "CSS classname for the pagination component"
}, {
	name: "selectedPageClass",
	dataType: "String",
    formDataType: 'string',
	defaultVal: "UNX-selected-page-item",
	description: "CSS classname for selected page item"
}, {
	name: "onPaginate",
	dataType: "Function",
    formDataType: 'func',
	defaultVal: "function(paginationInfo){}) ",
	description: "Callback function that gets called after a pagination action"
}, {
	name: "pageLimit",
	dataType: "Number",
    formDataType: 'number',
	defaultVal: 6,
	description: "Number of pages to show upfront (when type is FIXED_PAGINATION)"
}, {
	name: "infinteScrollTriggerEl",
	dataType: "Element",
    formDataType: 'string',
	defaultVal: window,
	description: "Element on which to detect infinite scroll page boundary (when type is set to INFINITE_SCROLL)"
}, {
	name: "heightDiffToTriggerNextPage",
	dataType: "Number",
    formDataType: 'number',
	defaultVal: 100,
	description: "Height of the page to consider to fetch the next page data (when type is set to INFINITE_SCROLL)"
}, {
	name: "action",
	dataType: "String",
    formDataType: 'string',
	defaultVal: "click",
	description: "Action on which pagination should trigger: 'click' or 'change' "
}, {
	name: "tagName",
	dataType: "String",
    formDataType: 'string',
	defaultVal: "DIV",
	description: "html element for the pagination wrapper. by defaultVal it is div."
}, {
	name: "htmlAttributes",
	dataType: "Object",
    formDataType: 'func',
	defaultVal: "{class:'UNX - pagination - size - block '}",
	description: "by defaultVal it contains classes for the wrapper. you can add more classes or any attributes"
}, {
	name: "events",
	dataType: "object",
    formDataType: 'func',
	defaultVal: "{}",
	description: "by defaultVal it will be empty. you can add further javascript events by keys and function as values. context will be the current object."
}]