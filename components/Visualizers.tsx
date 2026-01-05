import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DataChartProps {
  type: 'bar' | 'line' | 'pie';
  data: any[];
}

const CHART_COLORS = ['#2980b9', '#c0392b', '#27ae60', '#f39c12'];

export const DataChart: React.FC<DataChartProps> = ({ type, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4 border-b border-gray-100 pb-2">
        <h4 className="font-sans font-bold text-gray-700 uppercase tracking-widest text-xs">Veri Görselleştirme</h4>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" fill="#2980b9" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#c0392b" strokeWidth={3} dot={{r: 4}} />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-right italic">Kaynak: TÜİK ve İlgili Raporlar</p>
    </div>
  );
};

export const PullQuote: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="my-8 relative pl-8 border-l-4 border-journal-accent italic text-xl md:text-2xl font-serif text-gray-800 leading-relaxed">
      <span className="absolute top-0 left-2 text-6xl text-gray-100 -z-10 font-serif">“</span>
      {text}
    </div>
  );
};

export const Timeline: React.FC = () => {
  const events = [
    { year: '2014', title: 'Genç İşsizlik Artışı', desc: 'Genç işsizlik oranı çift haneleri zorlamaya başladı.' },
    { year: '2018', title: 'Ekonomik Daralma', desc: 'Kur şoku ve ekonomik yavaşlama istihdamı vurdu.' },
    { year: '2020', title: 'Pandemi Etkisi', desc: 'COVID-19 ile hizmet sektörü durdu, genç istihdamı çöktü.' },
    { year: '2024', title: 'Yapısal Kriz', desc: 'Diplomalı işsizlik ve beyin göçü zirveye ulaştı.' },
  ];

  return (
    <div className="my-10 bg-journal-100 p-6 rounded-lg overflow-x-auto">
       <div className="mb-4">
        <h4 className="font-sans font-bold text-gray-700 uppercase tracking-widest text-xs">Zaman Çizelgesi</h4>
      </div>
      <div className="flex min-w-max space-x-8 pb-4">
        {events.map((ev, idx) => (
          <div key={idx} className="relative w-64 pt-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
            <div className="absolute top-[-5px] left-0 w-3 h-3 bg-journal-blue rounded-full"></div>
            <span className="font-bold text-journal-blue block mb-1">{ev.year}</span>
            <h5 className="font-bold text-gray-900 text-sm mb-1">{ev.title}</h5>
            <p className="text-xs text-gray-600">{ev.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};