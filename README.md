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

- [zeppelin-amcharts-line](https://github.com/lonly197/zeppelin-amcharts-line) ([amcharts](https://www.amcharts.com/))
- [zeppelin-amcharts-area](https://github.com/ZEPL/zeppelin-amcharts-area) ([amcharts](https://www.amcharts.com/))
- **zeppelin-highcharts-column** ([highcharts](http://www.highcharts.com/))
- [zeppelin-highcharts-pie](https://github.com/lonly197/zeppelin-highcharts-heatmap) ([highcharts](http://www.highcharts.com/))
- [zeppelin-highcharts-heatmap](https://github.com/lonly197/zeppelin-highcharts-heatmap) ([highcharts](http://www.highcharts.com/))

## License

- Library: [highcharts](http://www.highcharts.com/)
- Icon: [icons8.com](https://icons8.com/web-app/for/21126/bar-chart) 

## Contact me

* Email: lonly197@gmail.com
