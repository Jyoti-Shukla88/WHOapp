<<<<<<< HEAD
import React, { useEffect, useState, useMemo, useCallback } from "react";
=======
import React, { useEffect, useState, useMemo, useCallback } from 'react';
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
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
<<<<<<< HEAD
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIndicatorsRequest,
  setSelectedCountry,
} from "../features/countryIndicatorsSlice";
import { LineChart } from "react-native-chart-kit";
import BottomNav from "../component/BottomNav";

import Svg, { G, Path } from "react-native-svg";
import * as d3Shape from "d3-shape";

const screenWidth = Dimensions.get("window").width;
=======
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIndicatorsRequest,
  setSelectedCountry,
} from '../features/countryIndicatorsSlice';
import { PieChart, LineChart } from 'react-native-chart-kit';
import BottomNav from '../component/BottomNav';

const screenWidth = Dimensions.get('window').width;
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3

export default function CountryProfileScreen({ navigation, route }) {
  const { countryCode } = route.params;
  const dispatch = useDispatch();
  const { selectedCountry, loading, error } = useSelector(
<<<<<<< HEAD
    (state) => state.indicators
  );

  const [activeTab, setActiveTab] = useState("age");
=======
    state => state.indicators
  );

  const [activeTab, setActiveTab] = useState('age');
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3

  useEffect(() => {
    if (countryCode) {
      dispatch(fetchIndicatorsRequest(countryCode));
      dispatch(setSelectedCountry(countryCode));
    }
  }, [countryCode, dispatch]);

<<<<<<< HEAD
  const handleSetActiveTab = useCallback((tab) => setActiveTab(tab), []);
=======
  const handleSetActiveTab = useCallback(tab => setActiveTab(tab), []);
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3

  const pieData = useMemo(() => {
    return Array.isArray(selectedCountry?.pieChart?.values)
      ? selectedCountry.pieChart.values.map((val, idx) => ({
          name: getAgeLabel(idx),
          population: Number(val) || 0,
          color: getAgeColor(idx),
        }))
      : [];
  }, [selectedCountry]);

<<<<<<< HEAD
  const lineData = useMemo(
    () => ({
      labels: selectedCountry?.lineChart?.years || [
        "2000",
        "2005",
        "2010",
        "2015",
        "2020",
      ],
      datasets: [
        {
          data: selectedCountry?.lineChart?.male || [5.8, 3.2, 2.1, 1.7, 1.2],
          color: () => "#2E7D32",
          strokeWidth: 2,
        },
        {
          data: selectedCountry?.lineChart?.female || [
            1.5, 1.0, 0.8, 0.6, 0.4,
          ],
          color: () => "#0277BD",
          strokeWidth: 2,
        },
        {
          data: selectedCountry?.lineChart?.total || [
            3.6, 2.1, 1.5, 1.2, 0.9,
          ],
          color: () => "#E65100",
          strokeWidth: 2,
        },
      ],
    }),
    [selectedCountry]
  );

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error) return <Text style={styles.center}>{error}</Text>;
  if (!selectedCountry)
    return <Text style={styles.center}>No data available</Text>;

  const { name, region, indicators } = selectedCountry;
  const population = indicators?.["1"];
  const incomeGroup = indicators?.["2"];
  const fatalities = indicators?.["3"];
  const deathRate = indicators?.["4"];
  const reportedFatalities = indicators?.["5"];
  const dataSource = indicators?.["6"];

  return (
    <ImageBackground
      source={require("../../assets/home_bg.png")}
=======
  const lineData = useMemo(() => ({
    labels: selectedCountry?.lineChart?.years || ['2000', '2005', '2010', '2015', '2020'],
    datasets: [
      { data: selectedCountry?.lineChart?.male || [5.8, 3.2, 2.1, 1.7, 1.2], color: () => '#2E7D32', strokeWidth: 2 },
      { data: selectedCountry?.lineChart?.female || [1.5, 1.0, 0.8, 0.6, 0.4], color: () => '#0277BD', strokeWidth: 2 },
      { data: selectedCountry?.lineChart?.total || [3.6, 2.1, 1.5, 1.2, 0.9], color: () => '#E65100', strokeWidth: 2 },
    ],
  }), [selectedCountry]);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error) return <Text style={styles.center}>{error}</Text>;
  if (!selectedCountry) return <Text style={styles.center}>No data available</Text>;

  const { name, region, indicators } = selectedCountry;
  const population = indicators?.['1'];
  const incomeGroup = indicators?.['2'];
  const fatalities = indicators?.['3'];
  const deathRate = indicators?.['4'];
  const reportedFatalities = indicators?.['5'];
  const dataSource = indicators?.['6'];

  return (
    <ImageBackground
      source={require('../../assets/home_bg.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
      style={styles.headerBg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
<<<<<<< HEAD
              source={require("../../assets/goBack.png")}
=======
              source={require('../../assets/goBack.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>

<<<<<<< HEAD
          <Text style={styles.headerTitle}>{name || "Country"}</Text>

          <TouchableOpacity onPress={() => console.log("Favourite clicked")}>
            <Image
              source={require("../../assets/favourite.png")}
=======
          <Text style={styles.headerTitle}>{name || 'Country'}</Text>

          <TouchableOpacity onPress={() => console.log('Favourite clicked')}>
            <Image
              source={require('../../assets/favourite.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* MAIN CONTENT */}
        <ScrollView
          style={[styles.content, styles.roundedContent]}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Region */}
          <View style={styles.regionRow}>
            <Image
<<<<<<< HEAD
              source={require("../../assets/globe.png")}
              style={styles.regionIcon}
              resizeMode="contain"
            />
            <Text style={styles.region}>{region || "Region"}</Text>
=======
              source={require('../../assets/globe.png')}
              style={styles.regionIcon}
              resizeMode="contain"
            />
            <Text style={styles.region}>{region || 'Region'}</Text>
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
          </View>

          {/* Burden + Tabs */}
          <View style={styles.headerRow}>
            <Text style={styles.burdenText}>Burden</Text>
            <View style={styles.tabRow}>
              <TouchableOpacity
<<<<<<< HEAD
                style={[styles.tab, activeTab === "age" && styles.activeTab]}
                onPress={() => handleSetActiveTab("age")}
              >
                <Image
                  source={require("../../assets/pie_chart.png")}
                  style={[
                    styles.tabIcon,
                    { tintColor: activeTab === "age" ? "#fff" : "#333" },
=======
                style={[styles.tab, activeTab === 'age' && styles.activeTab]}
                onPress={() => handleSetActiveTab('age')}
              >
                <Image
                  source={require('../../assets/pie_chart.png')}
                  style={[
                    styles.tabIcon,
                    { tintColor: activeTab === 'age' ? '#fff' : '#333' },
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
                  ]}
                  resizeMode="contain"
                />
                <Text
                  style={
<<<<<<< HEAD
                    activeTab === "age" ? styles.tabTextActive : styles.tabText
=======
                    activeTab === 'age' ? styles.tabTextActive : styles.tabText
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
                  }
                >
                  Age group
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
<<<<<<< HEAD
                style={[styles.tab, activeTab === "time" && styles.activeTab]}
                onPress={() => handleSetActiveTab("time")}
              >
                <Image
                  source={require("../../assets/trends_chart.png")}
                  style={[
                    styles.tabIcon,
                    { tintColor: activeTab === "time" ? "#fff" : "#333" },
=======
                style={[styles.tab, activeTab === 'time' && styles.activeTab]}
                onPress={() => handleSetActiveTab('time')}
              >
                <Image
                  source={require('../../assets/trends_chart.png')}
                  style={[
                    styles.tabIcon,
                    { tintColor: activeTab === 'time' ? '#fff' : '#333' },
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
                  ]}
                  resizeMode="contain"
                />
                <Text
                  style={
<<<<<<< HEAD
                    activeTab === "time" ? styles.tabTextActive : styles.tabText
=======
                    activeTab === 'time' ? styles.tabTextActive : styles.tabText
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
                  }
                >
                  Over time
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Chart */}
<<<<<<< HEAD
          {activeTab === "age" ? (
            <>
              <View style={styles.sectionDivider} />
              <Text style={styles.chartTitle}>
                Drowning deaths by age group
              </Text>
=======
          {activeTab === 'age' ? (
            <>
              <View style={styles.sectionDivider} />
              <Text style={styles.chartTitle}>Drowning deaths by age group</Text>
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              {pieData.length > 0 ? (
                <MemoPieChart data={pieData} />
              ) : (
                <Text style={styles.value}>No age-group data available</Text>
              )}
            </>
          ) : (
            <>
              <View style={styles.sectionDivider} />
<<<<<<< HEAD
              <Text style={styles.chartTitle}>
                Drowning deaths rates over time
              </Text>
=======
              <Text style={styles.chartTitle}>Drowning deaths rates over time</Text>
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              <MemoLineChart data={lineData} />
            </>
          )}

          {/* Source */}
          <Text style={styles.dataSource}>
            WHO Global Health Estimate Data 2023
          </Text>

          {/* Info Cards */}
          <View style={styles.cardGrid}>
            <MemoInfoCard
<<<<<<< HEAD
              icon={require("../../assets/population.png")}
=======
              icon={require('../../assets/population.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              title="Total Population"
              value={population}
              bg="#D6F5EC"
            />
            <MemoInfoCard
<<<<<<< HEAD
              icon={require("../../assets/income_group.png")}
=======
              icon={require('../../assets/income_group.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              title="Income Group"
              value={incomeGroup}
              bg="#EAF4D9"
            />
            <MemoInfoCard
<<<<<<< HEAD
              icon={require("../../assets/death_count.png")}
=======
              icon={require('../../assets/death_count.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              title="WHO Estimated Fatalities"
              value={fatalities}
              note="(in 2023)"
              bg="#FADDDD"
            />
            <MemoInfoCard
<<<<<<< HEAD
              icon={require("../../assets/death_rate.png")}
=======
              icon={require('../../assets/death_rate.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              title="WHO Estimated Death Rate"
              value={deathRate}
              note="(in 2023)"
              bg="#F5E1D7"
            />
            <MemoInfoCard
<<<<<<< HEAD
              icon={require("../../assets/death_count.png")}
=======
              icon={require('../../assets/death_count.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              title="Reported Fatalities"
              value={reportedFatalities}
              note="(in 2023)"
              bg="#DCE8F9"
            />
            <MemoInfoCard
<<<<<<< HEAD
              icon={require("../../assets/source.png")}
=======
              icon={require('../../assets/source.png')}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
              title="Source of national data"
              value={dataSource}
              note="(in 2023)"
              bg="#FFF5D6"
              bold
            />
          </View>

          {/* Explore Data Button */}
          <TouchableOpacity style={styles.exploreBtn}>
            <Text style={styles.exploreBtnText}>Explore Data</Text>
          </TouchableOpacity>

          <Text style={styles.noteText}>
            * Numbers of deaths have been rounded according to WHO reporting
            scheme.
          </Text>
        </ScrollView>
        <BottomNav />
      </View>
    </ImageBackground>
  );
}

// --- Memoized Charts & InfoCard ---
<<<<<<< HEAD
const MemoPieChart = React.memo(({ data }) => {
  const chartData = data.filter((item) => item.population > 0);

  const arcs = d3Shape
    .pie()
    .value((d) => d.population)(chartData);
     
  const arcGenerator = d3Shape
    .arc()
    .outerRadius(120)
    .innerRadius(60)
    .cornerRadius(10) // 👈 Rounded edges
    .padAngle(0.02);
  return (
    <View style={{ alignItems: "center" }}>
      <Svg height={260} width={screenWidth - 40}>
        <G x={(screenWidth - 40) / 2} y={130}>
          {arcs.map((arc, index) => (
            <Path
              key={`arc-${index}`}
              d={arcGenerator(arc)}
              fill={chartData[index].color}
            />
          ))}
        </G>
      </Svg>

      {/* Legends */}
      <View style={styles.legendWrapper}>
  <View style={styles.legendColumn}>
    {chartData.slice(0, Math.ceil(chartData.length / 2)).map((item, index) => (
      <View key={index} style={styles.legendItem}>
        <View
          style={[styles.legendDot, { backgroundColor: item.color }]}
        />
        <Text style={styles.legendText}>{item.name}</Text>
      </View>
    ))}
  </View>

  <View style={styles.legendColumn}>
    {chartData.slice(Math.ceil(chartData.length / 2)).map((item, index) => (
      <View key={index} style={styles.legendItem}>
        <View
          style={[styles.legendDot, { backgroundColor: item.color }]}
        />
        <Text style={styles.legendText}>{item.name}</Text>
      </View>
    ))}
  </View>
</View>

    </View>
  );
});
=======
const MemoPieChart = React.memo(({ data }) => (
  <View style={{ alignItems: 'center' }}>
    <PieChart
      data={data}
      width={screenWidth - 40}
      height={260}
      chartConfig={chartConfig}
      accessor={'population'}
      backgroundColor={'transparent'}
      paddingLeft={'30'}
      hasLegend={false}
      center={[50, 0]}
      absolute
    />
    <View style={styles.donutHole} />
    <View style={styles.legendWrapper}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.name}</Text>
        </View>
      ))}
    </View>
  </View>
));
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3

const MemoLineChart = React.memo(({ data }) => (
  <>
    <LineChart
      data={data}
      width={screenWidth - 40}
      height={260}
      chartConfig={{
<<<<<<< HEAD
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        propsForDots: { r: "3", strokeWidth: "1", stroke: "#000" },
        propsForBackgroundLines: { stroke: "#ccc", strokeDasharray: "" },
=======
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        propsForDots: { r: '3', strokeWidth: '1', stroke: '#000' },
        propsForBackgroundLines: { stroke: '#ccc', strokeDasharray: '' },
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
      }}
      bezier={false}
      fromZero={true}
      withShadow={false}
      style={{ marginVertical: 8, borderRadius: 12 }}
    />
    <View style={styles.legendWrapper}>
      <View style={styles.legendItem}>
<<<<<<< HEAD
        <View style={[styles.legendLine, { backgroundColor: "#E65100" }]} />
        <Text style={styles.legendText}>Total</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendLine, { backgroundColor: "#2E7D32" }]} />
        <Text style={styles.legendText}>Male</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendLine, { backgroundColor: "#0277BD" }]} />
=======
        <View style={[styles.legendLine, { backgroundColor: '#E65100' }]} />
        <Text style={styles.legendText}>Total</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendLine, { backgroundColor: '#2E7D32' }]} />
        <Text style={styles.legendText}>Male</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendLine, { backgroundColor: '#0277BD' }]} />
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
        <Text style={styles.legendText}>Female</Text>
      </View>
    </View>
  </>
));

const MemoInfoCard = React.memo(InfoCard);

// --- Utility & Components ---
const darkenColor = (hex, percent = 40) => {
<<<<<<< HEAD
  let num = parseInt(hex.replace("#", ""), 16);
=======
  let num = parseInt(hex.replace('#', ''), 16);
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) - amt;
  let G = ((num >> 8) & 0x00ff) - amt;
  let B = (num & 0x0000ff) - amt;
  return (
<<<<<<< HEAD
    "#" +
=======
    '#' +
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
    (
      0x1000000 +
      (R < 0 ? 0 : R > 255 ? 255 : R) * 0x10000 +
      (G < 0 ? 0 : G > 255 ? 255 : G) * 0x100 +
      (B < 0 ? 0 : B > 255 ? 255 : B)
    )
      .toString(16)
      .slice(1)
  );
};

function InfoCard({ icon, title, value, note, bg, bold }) {
  const textColor = useMemo(() => darkenColor(bg, 50), [bg]);
  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Image
        source={icon}
        style={[styles.cardIcon, { tintColor: textColor }]}
        resizeMode="contain"
      />
      <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
<<<<<<< HEAD
      <Text
        style={[
          bold ? styles.cardValueBold : styles.cardValue,
          { color: textColor },
        ]}
      >
        {value || "N/A"}
      </Text>
      {note && (
        <Text style={[styles.cardNote, { color: textColor }]}>{note}</Text>
      )}
=======
      <Text style={[bold ? styles.cardValueBold : styles.cardValue, { color: textColor }]}>
        {value || 'N/A'}
      </Text>
      {note && <Text style={[styles.cardNote, { color: textColor }]}>{note}</Text>}
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
    </View>
  );
}

<<<<<<< HEAD
const getAgeLabel = (index) => {
  const labels = [
    "0 to 4 years",
    "5 to 14 years",
    "15 to 29 years",
    "30 to 49 years",
    "50 to 69 years",
    "70+ years",
=======
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
};

const getAgeLabel = index => {
  const labels = [
    '0 to 4 years',
    '5 to 14 years',
    '15 to 29 years',
    '30 to 49 years',
    '50 to 69 years',
    '70+ years',
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
  ];
  return labels[index] || `Group ${index + 1}`;
};

<<<<<<< HEAD
const getAgeColor = (index) => {
  const colors = [
    "#2A9D8F",
    "#E9C46A",
    "#E76F51",
    "#6BAED6",
    "#F4A261",
    "#8D6E97",
  ];
  return colors[index] || "#ccc";
};

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerBg: { width: "100%", height: "100%" },
  headerContent: {
    height: "17%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 50,
  },
  icon: { width: 24, height: 24, tintColor: "#fff", marginTop: 50 },
  content: { padding: 20, flex: 1, backgroundColor: "#fff" },
  regionRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  regionIcon: { width: 18, height: 18, marginRight: 6 },
  region: { fontSize: 14, color: "#333" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  burdenText: { fontSize: 18, fontWeight: "600", color: "#111" },
  tabRow: { flexDirection: "row" },
  legendLine: { width: 20, height: 3, borderRadius: 2, marginRight: 6 },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 8,
    borderRadius: 16,
    backgroundColor: "#E5E5E5",
  },
  activeTab: { backgroundColor: "#0077B6" },
  tabIcon: { width: 14, height: 14, marginRight: 5 },
  tabText: { fontSize: 13, color: "#333" },
  tabTextActive: { fontSize: 13, color: "#fff", fontWeight: "600" },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    color: "#222",
  },
  legendWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    //justifyContent: "center",
  },
  legendColumn: {
  flex: 1,
  flexDirection: "column",
  alignItems: "flex-start", // aligns dots and text in vertical line
  paddingHorizontal: 10,
},
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: '20%',
    //width: "48%",
    marginBottom: 10,
    
  },
  legendDot: { width: 14, height: 14, borderRadius: 7, marginRight: 6 },
  legendText: { fontSize: 14, color: "#333"},
  dataSource: {
    fontSize: 12,
    color: "#777",
    marginTop: 20,
    textAlign: "center",
  },
  value: { fontSize: 14, color: "#444" },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: { width: "48%", borderRadius: 12, padding: 16, marginBottom: 12 },
  cardIcon: { width: 24, height: 24, marginBottom: 8 },
  cardTitle: { fontSize: 16, marginBottom: 4, fontWeight: "500" },
  cardValue: { fontSize: 19, fontWeight: "600" },
  cardValueBold: { fontSize: 15, fontWeight: "700" },
  cardNote: { fontSize: 11, marginTop: 4, fontStyle: "italic" },
  exploreBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 24,
    marginTop: 10,
    alignItems: "center",
    width: screenWidth * 0.5,
    marginLeft: "20%",
  },
  exploreBtnText: { fontSize: 14, fontWeight: "600", color: "#fff" },
  noteText: {
    fontSize: 11,
    color: "#444",
    

    marginTop: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  roundedContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    backgroundColor: '#fff',
  },
  sectionDivider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 12 },
=======
const getAgeColor = index => {
  const colors = ['#2A9D8F', '#E9C46A', '#E76F51', '#6BAED6', '#F4A261', '#8D6E97'];
  return colors[index] || '#ccc';
};

// --- Styles remain unchanged ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerBg: { width: '100%', height: '100%' },
  headerContent: {
    height: '17%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 50 },
  icon: { width: 24, height: 24, tintColor: '#fff', marginTop: 50 },
  content: { padding: 20, flex: 1, backgroundColor: '#fff' },
  regionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  regionIcon: { width: 18, height: 18, marginRight: 6 },
  region: { fontSize: 14, color: '#333' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  burdenText: { fontSize: 18, fontWeight: '600', color: '#111' },
  tabRow: { flexDirection: 'row' },
  legendLine: { width: 20, height: 3, borderRadius: 2, marginRight: 6 },
  tab: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, marginLeft: 8, borderRadius: 16, backgroundColor: '#E5E5E5' },
  activeTab: { backgroundColor: '#0077B6' },
  tabIcon: { width: 14, height: 14, marginRight: 5 },
  tabText: { fontSize: 13, color: '#333' },
  tabTextActive: { fontSize: 13, color: '#fff', fontWeight: '600' },
  chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 15, color: '#222' },
  donutHole: { position: 'absolute', top: 80, left: (screenWidth - 60) / 2 - 50, width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff' },
  legendWrapper: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 15, justifyContent: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 15, marginBottom: 10 },
  legendDot: { width: 14, height: 14, borderRadius: 7, marginRight: 6 },
  legendText: { fontSize: 12, color: '#333' },
  dataSource: { fontSize: 12, color: '#777', marginTop: 20, textAlign: 'center' },
  value: { fontSize: 14, color: '#444' },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  card: { width: '48%', borderRadius: 12, padding: 16, marginBottom: 12 },
  cardIcon: { width: 24, height: 24, marginBottom: 8 },
  cardTitle: { fontSize: 16, marginBottom: 4, fontWeight: '500' },
  cardValue: { fontSize: 19, fontWeight: '600' },
  cardValueBold: { fontSize: 15, fontWeight: '700' },
  cardNote: { fontSize: 11, marginTop: 4, fontStyle: 'italic' },
  exploreBtn: { backgroundColor: '#007bff', padding: 12, borderRadius: 24, marginTop: 10, alignItems: 'center', width: screenWidth * 0.5, marginLeft: '20%' },
  exploreBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  noteText: { fontSize: 11, color: '#444', marginTop: 12, textAlign: 'center', lineHeight: 16 },
  roundedContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, backgroundColor: '#fff' },
  sectionDivider: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
>>>>>>> e20c3f881dcc00328051fd848e1f6b300f24bff3
});
