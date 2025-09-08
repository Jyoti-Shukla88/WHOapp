import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIndicatorsRequest,
  setSelectedCountry,
} from '../features/countryIndicatorsSlice';
import Svg, { G, Path, Line, Text as SvgText } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import { toggleFavourite } from '../features/favouritesSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const chartHeight = 260;

export default function CountryProfileScreen({ navigation, route }) {
  const { countryCode } = route.params;
  const dispatch = useDispatch();
  const { selectedCountry, loading, error } = useSelector(
    state => state.indicators,
  );
  const favourites = useSelector(state => state.favourites?.items || []); // ✅ safe access
  const [activeTab, setActiveTab] = useState('age');

  useEffect(() => {
    if (countryCode) {
      dispatch(fetchIndicatorsRequest(countryCode));
      dispatch(setSelectedCountry(countryCode));
    }
  }, [countryCode, dispatch]);

  const handleSetActiveTab = useCallback(tab => setActiveTab(tab), []);

  const isFavourite = favourites.some(item => item.code === countryCode);

  const handleToggleFavourite = () => {
    if (selectedCountry) {
      dispatch(
        toggleFavourite({
          code: countryCode,
          name: selectedCountry.name,
          region: selectedCountry.region,
          flag: selectedCountry.flag || countryCode.slice(0,2),
        }),
      );
    }
  };

  // Pie Chart Data
  const pieData = useMemo(() => {
    return Array.isArray(selectedCountry?.pieChart?.values)
      ? selectedCountry.pieChart.values.map((val, idx) => ({
          name: getAgeLabel(idx),
          population: Number(val) || 0,
          color: getAgeColor(idx),
        }))
      : [];
  }, [selectedCountry]);

  // Line Chart Data
  const lineData = useMemo(() => {
    if (!selectedCountry?.trendsChart) return { labels: [], datasets: [] };

    const chart = selectedCountry.trendsChart;
    const datasets = [];

    if (chart.male?.length)
      datasets.push({ data: chart.male.map(Number), color: '#2E7D32' });
    if (chart.female?.length)
      datasets.push({ data: chart.female.map(Number), color: '#0277BD' });
    if (chart.total?.length)
      datasets.push({ data: chart.total.map(Number), color: '#E65100' });

    return {
      labels: chart.years || [],
      datasets,
    };
  }, [selectedCountry]);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error) return <Text style={styles.center}>{error}</Text>;
  if (!selectedCountry)
    return <Text style={styles.center}>No data available</Text>;

  const { name, region, indicators } = selectedCountry;
  const population = indicators?.['1'];
  const incomeGroup = indicators?.['2'];
  const fatalities = indicators?.['3'];
  const deathRate = indicators?.['4'];
  const reportedFatalities = indicators?.['5'];
  const dataSource = indicators?.['6'];

  // D3 scales and line generator
  const width = screenWidth - 30;
  const height = chartHeight;
  const paddingLeft = 70;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 50;

  const xScale = d3Scale
    .scalePoint()
    .domain(lineData.labels)
    .range([paddingLeft, width - paddingRight]);

  const maxYValue = Math.max(...lineData.datasets.flatMap(ds => ds.data), 1);
  const yScale = d3Scale
    .scaleLinear()
    .domain([0, maxYValue])
    .range([height - paddingBottom, paddingTop]);

  const lineGenerator = d3Shape
    .line()
    .x((_, index) => xScale(lineData.labels[index]))
    .y(value => yScale(value))
    .curve(d3Shape.curveMonotoneX);

  const xLabelStep = Math.ceil(lineData.labels.length / 5);

  return (
    <ImageBackground
      source={require('../../assets/home_bg.png')}
      style={styles.headerBg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/goBack.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{name || 'Country'}</Text>

          <TouchableOpacity onPress={handleToggleFavourite}>
            <Icon
              name={isFavourite ? 'star' : 'star-outline'}
              size={26}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* MAIN CONTENT */}
        <ScrollView
          style={[styles.content, styles.roundedContent]}
          contentContainerStyle={{ paddingBottom: 180 }}
        >
          {/* Region */}
          <View style={styles.regionRow}>
            <Image
              source={require('../../assets/globe.png')}
              style={styles.regionIcon}
              resizeMode="contain"
            />
            <Text style={styles.region}>{region || 'Region'}</Text>
          </View>

          {/* Burden + Tabs */}
          <View style={styles.headerRow}>
            <Text style={styles.burdenText}>Burden</Text>
            <View style={styles.tabRow}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'age' && styles.activeTab]}
                onPress={() => handleSetActiveTab('age')}
              >
                <Image
                  source={require('../../assets/pie_chart.png')}
                  style={[
                    styles.tabIcon,
                    { tintColor: activeTab === 'age' ? '#fff' : '#0e4176' },
                  ]}
                  resizeMode="contain"
                />
                <Text
                  style={
                    activeTab === 'age'
                      ? styles.tabTextActive
                      : styles.tabText
                  }
                >
                  Age group
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === 'time' && styles.activeTab]}
                onPress={() => handleSetActiveTab('time')}
              >
                <Image
                  source={require('../../assets/trends_chart.png')}
                  style={[
                    styles.tabIcon,
                    { tintColor: activeTab === 'time' ? '#fff' : '#0e4176' },
                  ]}
                  resizeMode="contain"
                />
                <Text
                  style={
                    activeTab === 'time'
                      ? styles.tabTextActive
                      : styles.tabText
                  }
                >
                  Over time
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Charts */}
          {activeTab === 'age' ? (
            <>
              <View style={styles.sectionDivider} />
              <Text style={styles.chartTitle}>
                Drowning deaths by age group
              </Text>
              {pieData.length ? <MemoPieChart data={pieData} /> : <Text>No age-group data available</Text>}
            </>
          ) : (
            <>
              <View style={styles.sectionDivider} />
              <Text style={styles.chartTitle}>
                Drowning death rates over time
              </Text>
              {lineData.labels.length ? (
                <Svg width={width} height={height}>
                  {/* Y-axis title */}
                  <SvgText
                    x={paddingLeft - 45}
                    y={height / 2}
                    fill="#333333d4"
                    fontSize={12}
                    fontWeight="400"
                    textAnchor="middle"
                    transform={`rotate(-90, ${paddingLeft - 45}, ${height / 2})`}
                  >
                    Rate (no. 100 000 population per year)
                  </SvgText>

                  {/* Horizontal grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                    <Line
                      key={`ygrid-${i}`}
                      x1={paddingLeft}
                      y1={paddingTop + t * (height - paddingTop - paddingBottom)}
                      x2={width - paddingRight}
                      y2={paddingTop + t * (height - paddingTop - paddingBottom)}
                      stroke="#eee"
                    />
                  ))}

                  {/* Lines */}
                  {lineData.datasets.map((ds, i) => (
                    <Path
                      key={`line-${i}`}
                      d={lineGenerator(ds.data)}
                      stroke={ds.color}
                      strokeWidth={2}
                      fill="none"
                    />
                  ))}

                  {/* X-axis ticks */}
                  {lineData.labels.map((label, i) => (
                    <Line
                      key={`xgrid-${i}`}
                      x1={xScale(label)}
                      y1={height - paddingBottom}
                      x2={xScale(label)}
                      y2={height - paddingBottom + 6}
                      stroke="#333"
                      strokeWidth={1}
                    />
                  ))}

                  {/* X-axis labels */}
                  {lineData.labels.map(
                    (label, i) =>
                      i % xLabelStep === 0 && (
                        <SvgText
                          key={`xlabel-${i}`}
                          x={xScale(label)}
                          y={height - paddingBottom + 20}
                          fontSize={12}
                          fill="#333"
                          textAnchor="middle"
                        >
                          {label}
                        </SvgText>
                      ),
                  )}

                  {/* Y-axis labels */}
                  {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                    const val = (maxYValue * (1 - t)).toFixed(1);
                    const y = paddingTop + t * (height - paddingTop - paddingBottom);
                    return (
                      <SvgText
                        key={`ylabel-${i}`}
                        x={paddingLeft - 15}
                        y={y + 4}
                        fontSize={12}
                        fill="#333"
                        textAnchor="end"
                      >
                        {val}
                      </SvgText>
                    );
                  })}
                </Svg>
              ) : (
                <Text>No trend data available</Text>
              )}
            </>
          )}

          {/* Data source */}
          <Text style={styles.dataSource}>WHO Global Health Estimate Data 2021</Text>
          {dataSource && (
            <Text style={styles.dataSourceExtra}>
              <Text style={{ fontWeight: '700' }}>Data Source: </Text>
              {dataSource}
            </Text>
          )}

          {/* Info Cards */}
          <View style={styles.cardGrid}>
            <MemoInfoCard icon={require('../../assets/population.png')} title="Total Population" value={population} bg="#D6F5EC" />
            <MemoInfoCard icon={require('../../assets/income_group.png')} title="Income Group" value={incomeGroup} bg="#EAF4D9" />
            <MemoInfoCard icon={require('../../assets/death_count.png')} title="WHO Estimated Fatalities" value={fatalities} bg="#FADDDD" />
            <MemoInfoCard icon={require('../../assets/death_rate.png')} title="WHO Estimated Death Rate" value={deathRate} bg="#F5E1D7" />
            <MemoInfoCard icon={require('../../assets/death_count.png')} title="Reported Fatalities" value={reportedFatalities} bg="#DCE8F9" />
            <MemoInfoCard icon={require('../../assets/source.png')} title="Source of national data" value={dataSource} bg="#FFF5D6" bold />
          </View>

          <TouchableOpacity style={styles.exploreBtn}>
            <Text style={styles.exploreBtnText}>Explore Data</Text>
          </TouchableOpacity>

          <Text style={styles.noteText}>
            * Numbers of deaths have been rounded according to the following scheme: 100 rounded to nearest 1; 100-999 rounded to nearest 10; 1000-9999 rounded to nearest 100; and 10 000 rounded to nearest 1000
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

// ---------------- Memoized Pie Chart ----------------
const MemoPieChart = React.memo(({ data }) => {
  const chartData = data.filter(item => item.population > 0);
  const arcs = d3Shape.pie().value(d => d.population)(chartData);
  const arcGenerator = d3Shape.arc().outerRadius(160).innerRadius(60).cornerRadius(10).padAngle(0.02);

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg height={360} width={screenWidth - 40}>
        <G x={(screenWidth - 40) / 2} y={180}>
          {arcs.map((arc, index) => (
            <Path key={index} d={arcGenerator(arc)} fill={chartData[index].color} />
          ))}
        </G>
      </Svg>

      {/* Legends */}
      <View style={styles.legendWrapper}>
        <View style={styles.legendColumn}>
          {[0, 2, 4].map(
            i =>
              chartData[i] && (
                <View key={i} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: chartData[i].color }]} />
                  <Text style={styles.legendText}>{chartData[i].name}</Text>
                </View>
              ),
          )}
        </View>
        <View style={styles.legendColumn}>
          {[1, 3, 5].map(
            i =>
              chartData[i] && (
                <View key={i} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: chartData[i].color }]} />
                  <Text style={styles.legendText}>{chartData[i].name}</Text>
                </View>
              ),
          )}
        </View>
      </View>
    </View>
  );
});

// ---------------- Memoized InfoCard ----------------
const MemoInfoCard = React.memo(InfoCard);
function InfoCard({ icon, title, value, note, bg, bold }) {
  const textColor = useMemo(() => darkenColor(bg, 50), [bg]);
  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Image source={icon} style={[styles.cardIcon, { tintColor: textColor }]} resizeMode="contain" />
      <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
      <Text style={[bold ? styles.cardValueBold : styles.cardValue, { color: textColor }]}>{value || 'N/A'}</Text>
      {note && <Text style={[styles.cardNote, { color: textColor }]}>{note}</Text>}
    </View>
  );
}

// ---------------- Utilities ----------------
const darkenColor = (hex, percent = 40) => {
  let num = parseInt(hex.replace('#', ''), 16);
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) - amt;
  let G = ((num >> 8) & 0x00ff) - amt;
  let B = (num & 0x0000ff) - amt;
  return '#' + (
    0x1000000 +
    (R < 0 ? 0 : R > 255 ? 255 : R) * 0x10000 +
    (G < 0 ? 0 : G > 255 ? 255 : G) * 0x100 +
    (B < 0 ? 0 : B > 255 ? 255 : B)
  ).toString(16).slice(1);
};

const getAgeLabel = index => [
  '0 to 4 years',
  '5 to 14 years',
  '15 to 29 years',
  '30 to 49 years',
  '50 to 69 years',
  '70+ years',
][index] || `Group ${index + 1}`;

const getAgeColor = index => [
  '#2A9D8F',
  '#E9C46A',
  '#E76F51',
  '#6BAED6',
  '#F4A261',
  '#8D6E97',
][index] || '#ccc';

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerBg: { width: '100%', height: '100%' },
  headerContent: { height: '9%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 35 },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#fff' },
  icon: { width: 24, height: 24, tintColor: '#fff' },
  content: { padding: 20, flex: 1, backgroundColor: '#fff' },
  regionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  regionIcon: { width: 18, height: 18, marginRight: 6 },
  region: { fontSize: 17, color: '#060606ff', fontWeight: '500' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 11 },
  burdenText: { fontSize: 22, fontWeight: '600', color: '#060606ff' },
  tabRow: { flexDirection: 'row' },
  tab: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 17, marginLeft: 8, borderRadius: 16 },
  activeTab: { backgroundColor: '#0e4177f6' },
  tabIcon: { width: 15, height: 15, marginRight: 5 },
  tabText: { fontSize: 15, color: '#0e4177f6' },
  tabTextActive: { fontSize: 15, color: '#fff', fontWeight: '600' },
  chartTitle: { fontSize: 19, fontWeight: '600', marginBottom: 15, color: '#141313ff' },
  legendWrapper: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  legendColumn: { marginHorizontal: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  legendLine: { width: 20, height: 3, borderRadius: 2, marginRight: 6 },
  legendText: { fontSize: 14, color: '#333' },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },
  dataSource: { fontSize: 15, color: '#1a1a1ae5', marginTop: 5, textAlign: 'center', fontWeight: '600' },
  dataSourceExtra: { fontSize: 16, color: '#444', marginTop: 10, fontWeight: '400' },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  card: { width: '47%', borderRadius: 12, padding: 16, marginBottom: 15 },
  cardIcon: { width: 24, height: 24, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  cardValue: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  cardValueBold: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
  cardNote: { fontSize: 12, fontWeight: '400', opacity: 0.7 },
  exploreBtn: { backgroundColor: '#0e4177f6', paddingVertical: 8, paddingHorizontal: 30, borderRadius: 25, alignSelf: 'center', alignItems: 'center', marginTop: 20, minWidth: 150 },
  exploreBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  noteText: { fontSize: 12, color: '#444', marginTop: 15, textAlign: 'center', paddingHorizontal: 15, marginBottom: 60 },
  navWrapper: { position: 'absolute', bottom: 10, left: 0, right: 0, alignItems: 'center' },
  sectionDivider: { borderBottomWidth: 1, borderBottomColor: '#ddd', marginVertical: 15 },
  roundedContent: { borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: 'hidden', backgroundColor: '#fff' },
});
