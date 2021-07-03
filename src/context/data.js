import { useState, createContext, useEffect } from "react";
import { socket } from "./socket";
import superagent from 'superagent'


export const DataContext = createContext();

export default function Data(props) {
  const [test, setTest] = useState("from context");
  const [totals, setTotals] = useState({ tickets: 0, TAs: 44, students: 396 });
  const [users, setUsers] = useState({ available: [], inTicket: [], notAvailable: [], excused: [] });
  const [chart, setChart] = useState([]);
  const [dailyTicketsLevels, setDailyTicketsLevels] = useState({ '102': 0, '201': 5, '301': 7, '401js': 2, '401java': 4, '401py': 3 });
  const [dailyTicketsInfo, setDailyTicketsInfo] = useState({ opened: 0, closed: 0, claimed: 0 });
  const [average, setAverage] = useState({
    avgClaimed: 0,
    avgOpened: 0,
    avgTicketsPerStudent: 1
  });
  const loadAll = async () => {
    const results = await superagent.get('http://localhost:3030/all');
    const payload = results.body;

    // console.log("from server", payload);
    setUsers(payload.users);
    setTotals(payload.totals);
    setChart(payload.chart);
    setDailyTicketsLevels(payload.dailyTicketsLevels);
    setDailyTicketsInfo(payload.dailyTicketsInfo);
    setAverage(payload.average);
    console.log("all");
  }
  useEffect(() => {
    loadAll()
    socket.on("changeRole", (payload) => {
      // console.log("from server", payload);
      setUsers(payload.users);
      setTotals(payload.totals);
      console.log("changeRole");
    });
    socket.on("createTicket", (payload) => {
      // console.log("from server", payload);
      setTotals(payload.totals);
      setChart(payload.chart);
      setDailyTicketsLevels(payload.dailyTicketsLevels);
      setDailyTicketsInfo(payload.dailyTicketsInfo);
      setAverage(payload.average);
      console.log("createTicket");
    });
    socket.on("claimUnclaimCloseTicket", (payload) => {
      // console.log("from server", payload);
      setDailyTicketsInfo(payload.dailyTicketsInfo);
      setAverage(payload.average);
      setUsers(payload.users);
      console.log("claimTicket");
    });
    socket.on("changeRoom", (payload) => {
      // console.log("from server", payload);
      setUsers(payload.users);
      console.log("changeRoom");
    });
  }, []);

  const state = {
    test,
    setTest,
    totals,
    users,
    chart,
    dailyTicketsLevels,
    dailyTicketsInfo,
    average,
  };

  return (
    <DataContext.Provider value={state}>{props.children}</DataContext.Provider>
  );
}