import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Title, Text} from 'react-native-paper';
import Svg, {Rect} from 'react-native-svg';
import Animated from 'react-native-reanimated';

const {width} = Dimensions.get('screen');
const svgWidth = width * 3;

export interface CandleProps {
  data: any;
  country: String;
}

export interface TimelineDataType {
  date: String;
  difference: number;
}

const CandleCharts = (props: CandleProps) => {
  let {data, country} = props;
  const [pressedData, setPressedData] = useState<TimelineDataType>({
    date: '',
    difference: -1,
  });
  const [animatedOpacity, setAnimatedOpacity] = useState(0);
  let scrollView: ScrollView | null;
  let widthOfCandle = 10;
  let xWidth = 12;
  let heightScale = 1;
  if (data.length !== 0) {
    const max = data[data.length - 1].difference;
    data = data.filter((d: any) => d.difference / max > 0.001);
    xWidth = svgWidth / data.length;
    widthOfCandle = xWidth - 1;
    heightScale = width / data[data.length - 1].difference;
  }
  let color = 'red';
  return (
    <View style={styles.countrySection}>
      <View style={styles.countryHeader}>
        <Title style={styles.countrySectionTitle}>
          {country ? `${country}'s Timeline` : ' Unknown Country '}:{' '}
        </Title>
      </View>
      <Animated.View
        style={[styles.animatedDataDialog, {opacity: animatedOpacity}]}>
        <Text>
          Active Cases: {pressedData.difference ? pressedData.difference : 0}
        </Text>
        <Text>Date: {pressedData.date ? pressedData.date : 0}</Text>
      </Animated.View>
      <ScrollView
        ref={(ref) => {
          scrollView = ref;
        }}
        onContentSizeChange={() =>
          scrollView !== null ? scrollView.scrollToEnd({animated: true}) : null
        }
        style={styles.graphContainer}
        horizontal={true}
        scrollEventThrottle={16}>
        {data.length !== 0 ? (
          <Svg width={svgWidth + 20} height={width}>
            {data.map((d: any, index: any) => {
              if (index !== 0) {
                if (d.difference - data[index - 1].difference < 0) {
                  color = 'green';
                } else if (d.difference - data[index - 1].difference === 0) {
                  color = 'yellow';
                } else {
                  color = 'red';
                }
              }
              return (
                <Rect
                  key={`case${index}`}
                  x={xWidth * index}
                  y={width - heightScale * d.difference}
                  width={widthOfCandle}
                  height={heightScale * d.difference}
                  fill={color}
                  stroke={d.date === pressedData.date ? 'black' : undefined}
                  onPress={() => {
                    setPressedData(d);
                    setAnimatedOpacity(1);
                  }}
                />
              );
            })}
          </Svg>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: '#FFC692',
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    borderRadius: 16,
  },
  countryHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  countrySectionTitle: {
    textAlign: 'left',
    color: 'black',
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: '',
  },
  animatedDataDialog: {
    color: 'black',
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    left: 20,
    top: 0,
  },
  graphContainer: {
    backgroundColor: '#FFC692',
    padding: 10,
  },
});

export default CandleCharts;