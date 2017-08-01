/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const settingTemplate = `
<div class="panel panel-default" style="margin-top: 10px; margin-bottom: 11px;">

  <!-- panel: axis (configured column) information -->
  <div class="panel-heading"
       style="padding: 6px 12px 6px 12px; font-size: 13px;">
    <span style="vertical-align: middle; display: inline-block; margin-top: 3px;">Charts</span>
    <span style="float: right;">
       <div class="btn-group" role="group" aria-label="...">
         <div type="button" ng-click="resetAxisConfig()"
              ng-if="config.panel.columnPanelOpened"
              class="btn btn-default" style="padding: 2px 5px 2px 5px;">
           <i class="fa fa-trash-o" aria-hidden="true"></i>
         </div>
         <div type="button" ng-if="config.panel.columnPanelOpened"
              ng-click="toggleColumnPanel()"
              class="btn btn-default" style="padding: 2px 5px 2px 5px;">
           <i class="fa fa-minus" style="font-size: 12px;" aria-hidden="true"></i>
         </div>
         <div type="button" ng-if="!config.panel.columnPanelOpened"
              ng-click="toggleColumnPanel()"
              class="btn btn-default" style="padding: 2px 5px 2px 5px;">
           <i class="fa fa-expand" style="font-size: 11px;" aria-hidden="true"></i>
         </div>
       </div>
    </span>
    <div style="clear: both;"></div> <!-- to fix previous span which has float: right -->
  </div>
  <div class="panel-body" ng-if="config.panel.columnPanelOpened"
       style="padding: 8px; margin-top: 3px;">
    <ul class="noDot">
      <li class="liVertical" ng-repeat="chart in config.chart.available">
        <label class="radio-inline">
          <input type="radio" style="margin-top: 1px; margin-left: -17px;"
                 ng-checked="config.chart.current === chart"
                 ng-click="chartChanged(chart)" value="{{chart}}" />
          <span style="vertical-align: middle;">
            {{chart}} {{useSharedAxis(chart) ? '(shared)' : ''}}
          </span>
        </label>
      </li>
    </ul>
  </div>

  <!-- panel: available columns -->
  <div class="panel-heading" ng-if="config.panel.columnPanelOpened"
       style="padding: 6px 12px 6px 12px; font-size: 13px; border-top: 1px solid #ddd; border-top-left-radius: 0px; border-top-right-radius: 0px;">
    <span>Available Columns</span>
  </div>
  <div class="panel-body" ng-if="config.panel.columnPanelOpened"
       style="padding: 8px; margin-top: 3px;">
    <ul class="noDot">
      <li class="liVertical" ng-repeat="column in columns">
        <div class="btn btn-default btn-xs"
             style="background-color: #EFEFEF;"
             data-drag="true"
             data-jqyoui-options="{revert: 'invalid', helper: 'clone'}"
             ng-model="columns"
             jqyoui-draggable="{index: {{$index}}, placeholder: 'keep'}">
          {{column.name | limitTo: 30}}{{column.name.length > 30 ? '...' : ''}}
        </div>
      </li>
    </ul>
  </div>

  <!-- panel: axis (configured columns) -->
  <hr style="margin: 1px;" ng-if="config.panel.columnPanelOpened" />
  <div class="panel-body" ng-if="config.panel.columnPanelOpened"
       style="margin-top: 7px; padding-top: 9px; padding-bottom: 4px;">
    <div class="row">
      <div class="col-sm-4 col-md-3"
           ng-repeat="axisSpec in config.axisSpecs[config.chart.current]">
        <div class="columns lightBold">
          <!-- axis name -->
          <span class="label label-default"
                ng-style="getAxisAnnotationColor(axisSpec)"
                uib-tooltip="{{axisSpec.description ? axisSpec.description + ' ' + getAxisTypeAnnotation(axisSpec) : ''}}"
                style="font-weight: 300; font-size: 13px; margin-left: 1px;">
            {{getAxisAnnotation(axisSpec)}}
          </span>

          <!-- axis box: in case of single dimension -->
          <ul data-drop="true"
              ng-if="isSingleDimensionAxis(axisSpec)"
              ng-model="config.axis[config.chart.current][axisSpec.name]"
              jqyoui-droppable="{onDrop:'axisChanged(axisSpec)'}"
              class="list-unstyled"
              style="height:36px; border-radius: 6px; margin-top: 7px; overflow: visible !important;">
            <li ng-if="config.axis[config.chart.current][axisSpec.name]">

              <!-- in case of axis is single dimension and not aggregator -->
              <div ng-if="!isAggregatorAxis(axisSpec)"
                   class="btn btn-default btn-xs"
                   style="background-color: #EFEFEF;">
                {{ getSingleDimensionAxis(axisSpec).name }}
                <span class="fa fa-close" ng-click="removeFromAxis(null, axisSpec)"></span>
              </div>

              <!-- in case of axis is single dimension and aggregator -->
              <div class="btn-group">
                <div ng-if="isAggregatorAxis(axisSpec)"
                     class="btn btn-default btn-xs dropdown-toggle"
                     style="background-color: #EFEFEF; "
                     type="button" data-toggle="dropdown">
                  {{getSingleDimensionAxis(axisSpec).name | limitTo: 30}}{{getSingleDimensionAxis(axisSpec).name > 30 ? '...' : ''}}
                  <span style="color:#717171;">
                    <span class="lightBold" style="text-transform: uppercase;">{{getSingleDimensionAxis(axisSpec).aggr}}</span>
                  </span>
                  <span class="fa fa-close" ng-click="removeFromAxis(null, axisSpec)"></span>
                </div>
                <ul class="dropdown-menu" role="menu">
                  <li ng-click="aggregatorChanged(null, axisSpec, 'sum')"><a>sum</a></li>
                  <li ng-click="aggregatorChanged(null, axisSpec, 'count')"><a>count</a></li>
                  <li ng-click="aggregatorChanged(null, axisSpec, 'avg')"><a>avg</a></li>
                  <li ng-click="aggregatorChanged(null, axisSpec, 'min')"><a>min</a></li>
                  <li ng-click="aggregatorChanged(null, axisSpec, 'max')"><a>max</a></li>
                </ul>
              </div>

            </li>
          </ul>

          <!-- axis box: in case of multiple dimensions -->
          <ul data-drop="true"
              ng-if="!isSingleDimensionAxis(axisSpec) "
              ng-model="config.axis[config.chart.current][axisSpec.name]"
              jqyoui-droppable="{multiple: true, onDrop:'axisChanged(axisSpec)'}"
              class="list-unstyled"
              style="height: 108px; border-radius: 6px; margin-top: 7px; overflow: auto !important;">

            <span ng-repeat="col in config.axis[config.chart.current][axisSpec.name]">

              <!-- in case of axis is multiple dimensions and not aggregator -->
              <span ng-if="!isAggregatorAxis(axisSpec)"
                    class="btn btn-default btn-xs"
                    style="background-color: #EFEFEF; margin: 2px 0px 0px 2px;">
                {{col.name}}
                <span class="fa fa-close" ng-click="removeFromAxis($index, axisSpec)"></span>
              </span>

              <!-- in case of axis is multiple dimension and aggregator -->
              <span class="btn-group">
                <span ng-if="isAggregatorAxis(axisSpec)"
                      class="btn btn-default btn-xs dropdown-toggle"
                      style="background-color: #EFEFEF; margin: 2px 0px 0px 2px;"
                      type="button" data-toggle="dropdown">
                  {{col.name | limitTo: 30}}{{col.name.length > 30 ? '...' : ''}}
                  <span style="color:#717171; margin: 0px;">
                    <span class="lightBold"
                          style="text-transform: uppercase; margin: 0px;">{{col.aggr}}
                    </span>
                  </span>
                  <span class="fa fa-close" style="margin: 0px;" ng-click="removeFromAxis($index, axisSpec)"></span>
                </span>
                <ul class="dropdown-menu" role="menu">
                  <li ng-click="aggregatorChanged($index, axisSpec, 'sum')"><a>sum</a></li>
                  <li ng-click="aggregatorChanged($index, axisSpec, 'count')"><a>count</a></li>
                  <li ng-click="aggregatorChanged($index, axisSpec, 'avg')"><a>avg</a></li>
                  <li ng-click="aggregatorChanged($index, axisSpec, 'min')"><a>min</a></li>
                  <li ng-click="aggregatorChanged($index, axisSpec, 'max')"><a>max</a></li>
                </ul>
              </span>

            </span>
          </ul>

        </div>
      </div>
    </div>
  </div>

</div>

<!-- panel: parameter information -->
<div class="panel panel-default">

  <div class="panel-heading" style="padding: 6px 12px 6px 12px; font-size: 13px;">
    <span style="vertical-align: middle; display: inline-block; margin-top: 3px;">Parameters</span>
    <span style="float: right;">
      <div class="btn-group" role="group" aria-label="...">
        <div type="button" ng-click="parameterChanged()"
             ng-if="config.panel.parameterPanelOpened"
             class="btn btn-default" style="padding: 2px 5px 2px 5px;">
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
        </div>
        <div type="button" ng-click="resetParameterConfig()"
             ng-if="config.panel.parameterPanelOpened"
             class="btn btn-default" style="padding: 2px 5px 2px 5px;">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
        <div type="button" ng-if="config.panel.parameterPanelOpened"
             ng-click="toggleParameterPanel()"
             class="btn btn-default" style="padding: 2px 5px 2px 5px;">
          <i class="fa fa-minus" style="font-size: 12px;" aria-hidden="true"></i>
        </div>
        <div type="button" ng-if="!config.panel.parameterPanelOpened"
             ng-click="toggleParameterPanel()"
             class="btn btn-default" style="padding: 2px 5px 2px 5px;">
          <i class="fa fa-expand" style="font-size: 11px;" aria-hidden="true"></i>
        </div>
      </div>
    </span>
    <div style="clear: both;"></div> <!-- to fix previous span which has float: right -->
  </div>
  <div class="panel-body"
       ng-if="config.panel.parameterPanelOpened"
       style="padding-top: 13px; padding-bottom: 13px; height: 400px; overflow: auto;">
    <table class="table table-striped">
      <tr>
        <th style="font-size: 12px; font-style: italic">Name</th>
        <th style="font-size: 12px; font-style: italic">Type</th>
        <th style="font-size: 12px; font-style: italic">Description</th>
        <th style="font-size: 12px; font-style: italic">Value</th>
      </tr>
      <tr>
      </tr>

      <tr data-ng-repeat="paramSpec in config.paramSpecs[config.chart.current]">
        <td style="font-weight: 400; vertical-align: middle;">{{paramSpec.name}}</td>
        <td style="font-weight: 400; vertical-align: middle;">{{paramSpec.valueType}}</td>
        <td ng-bind-html="paramSpec.description"
          style="font-weight: 400; vertical-align: middle;"></td>
        <td>
          <div ng-if="isInputWidget(paramSpec)"
               class="input-group">
            <input type="text" class="form-control input-sm"
                   style="font-weight: 400; font-size: 12px; vertical-align:middle; border-radius: 5px;"
                   ng-keydown="parameterOnKeyDown($event, paramSpec)"
                   data-ng-model="config.parameter[config.chart.current][paramSpec.name]" />
          </div>
          <div class="btn-group"
               ng-if="isOptionWidget(paramSpec)">
            <select class="form-control input-sm"
                    ng-keydown="parameterOnKeyDown($event, paramSpec)"
                    ng-change="parameterChanged(paramSpec)"
                    data-ng-model="config.parameter[config.chart.current][paramSpec.name]"
                    data-ng-options="optionValue for optionValue in paramSpec.optionValues"
                    style="font-weight: 400; font-size: 12px;">
            </select>
          </div>

          <div ng-if="isCheckboxWidget(paramSpec)">
            <input type="checkbox"
                   ng-keydown="parameterOnKeyDown($event, paramSpec)"
                   ng-click="parameterChanged(paramSpec)"
                   data-ng-model="config.parameter[config.chart.current][paramSpec.name]"
                   data-ng-checked="config.parameter[config.chart.current][paramSpec.name]" />
          </div>

          <div ng-if="isTextareaWidget(paramSpec)">
            <textarea class="form-control" rows="3"
                      ng-keydown="parameterOnKeyDown($event, paramSpec)"
                      data-ng-model="config.parameter[config.chart.current][paramSpec.name]"
                      style="font-weight: 400; font-size: 12px;">
            </textarea>
          </div>

        </td>
      </tr>
    </table>
  </div>

</div>
`
export {settingTemplate}
