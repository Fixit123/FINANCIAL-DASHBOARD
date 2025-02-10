'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TooltipItem
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ChevronDown } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenueData = [30000, 45000, 42000, 50000, 48000, 54000]

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#000000',
      padding: 12,
      bodyFont: {
        size: 14,
      },
      callbacks: {
        label: function(context: TooltipItem<'line'>) {
          if (typeof context.raw === 'number') {
            return `$${context.raw.toLocaleString()}`
          }
          return ''
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      type: 'linear',
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return `$${(value as number/1000).toFixed(0)}k`
        }
      }
    }
  }
}

const data = {
  labels: months,
  datasets: [
    {
      data: revenueData,
      borderColor: '#2D7FF9',
      backgroundColor: 'rgba(45, 127, 249, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#2D7FF9',
      pointBorderColor: '#FFFFFF',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }
  ]
}

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">Revenue Chart</h2>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          Last 6 months
          <ChevronDown size={16} />
        </button>
      </div>
      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>
    </div>
  )
} 