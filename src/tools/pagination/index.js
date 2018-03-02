import angular from "angular";
import Template from "./template.html";
import './style.less';

export let Pagination = angular.module("magic.tools.pagination", []);

Pagination.run(function($templateCache) {
  $templateCache.put("magic.pagination", Template);
});

export default Pagination.name;
