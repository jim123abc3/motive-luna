import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import mockData from '../data/MOCK_DATA.json';

const Charts = () => {
  const data01 = mockData.slice(0,20);
  const data02 = mockData.slice(40,20);

  return (
    <div>
      <BarChart width={730} height={500} data={mockData.slice(0, 20)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="years_of_experience" />
        <YAxis dataKey="salary" />
        <Tooltip />
        <Legend />
        <Bar dataKey="years_of_experience" fill="#8884d8" />
        <Bar dataKey="salary" fill="#82ca9d" />
      </BarChart>
      <PieChart width={730} height={250}>
        <Pie data={data01} dataKey="salary" nameKey="salary" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        <Pie data={data02} dataKey="years_of_experience" nameKey="years_of_experience" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
      </PieChart>
    </div>
  )
}

export default Charts;