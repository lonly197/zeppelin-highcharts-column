# zeppelin-highcharts-column

The Ultimate Column Chart for Apache Zeppelin using [highcharts](https://www.highcharts.com/)


## Compatibility

| Chart Version | Zeppelin Version |
| :---: | :---: |
| ALL | 0.7.0+ |

## Install

```shell
export ZEPPELIN_HOME=/opt/zeppelin
cd $ZEPPELIN_HOME/local-repo/
git clone https://github.com/lonly197/zeppelin-highcharts-column.git
cd zeppelin-highcharts-column
npm install
cp zeppelin-highcharts-column.json $ZEPPELIN_HOME/helium/
```

Place zeppelin-highcharts-column.json in local registry (default location is ZEPPELIN_HOME/helium.)
And enable visualization from Helium menu.

## Usage

- **xAxis**: `categorical`
- **yAxis**: `number`
- **category**: `categorical`

## Screenshots 

![](https://raw.githubusercontent.com/lonly197/zeppelin-highcharts-column/master/screenshots/column-usage.gif)

## Ultimate Charts

- [ultimate-line-chart](https://github.com/ZEPL/zeppelin-ultimate-line-chart) ([amcharts](https://www.amcharts.com/))
- [ultimate-area-chart](https://github.com/ZEPL/zeppelin-ultimate-area-chart) ([amcharts](https://www.amcharts.com/))
- **zeppelin-highcharts-column** ([highcharts](http://www.highcharts.com/))
- [ultimate-pie-chart](https://github.com/ZEPL/zeppelin-ultimate-pie-chart) ([highcharts](http://www.highcharts.com/))
- [ultimate-range-chart](https://github.com/ZEPL/zeppelin-ultimate-range-chart) ([highcharts](http://www.highcharts.com/))
- [ultimate-scatter-chart](https://github.com/ZEPL/zeppelin-ultimate-scatter-chart) ([highcharts](http://www.highcharts.com/))
- [ultimate-heatmap-chart](https://github.com/ZEPL/zeppelin-ultimate-heatmap-chart) ([highcharts](http://www.highcharts.com/))

## License

- Library: [highcharts](http://www.highcharts.com/)
- Icon: [icons8.com](https://icons8.com/web-app/for/21126/bar-chart) 
