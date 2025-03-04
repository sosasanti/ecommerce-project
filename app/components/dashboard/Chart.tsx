import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

export function Chart(){
    return (
        <ResponsiveContainer width="100%" height={400}>
           <LineChart>
                <CartesianGrid strokeDasharray="3 3">
                    <XAxis />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line  type="monotone" stroke="#3b82f6" activeDot={ {r:8} }/>
                </CartesianGrid>
            </LineChart> 
        </ResponsiveContainer>
    )
}