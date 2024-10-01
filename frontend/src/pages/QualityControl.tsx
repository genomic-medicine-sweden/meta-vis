import { useEffect, useState } from "react";
import { Button, message, notification, Table } from "antd"
import { DownloadOutlined } from '@ant-design/icons'; 
import { QualityControlData } from "../interfaces";
import { getQualityControl } from "../api";


export const QualityControl: React.FC = () => {
  const [qualityControlData, setQualityControlData] = useState<QualityControlData[]>([]);
  
  useEffect(() => {
    getQualityControl()
      .then((data) => {
        if (Array.isArray(data)) {
          setQualityControlData(data);
        } else {
          notification.error({
            message: "Data Error",
            description: "Invalid data format from API",
          });
        }
      })
      .catch(() => {
        notification.error({
          message: "Fetch Error",
          description: "Failed to fetch quality control data",
        });
      });
  }, []);

  const mockData: QualityControlData[] = [
    {
      key: '1',
      totalReads: 180000,
      totalReadsAfterFiltering: 175000,
      humanMappedReads: 85000,
      humanKrakenReads: 5000,
      totalHumanReadsPercent: '48.57%', 
      bacterialReadsPercent: '22.86%',  
      virusReadsPercent: '1.71%',     
      eukaryoteReadsPercent: '4%',      
      otherReadsPercent: '1.71%',       
      unclassifiedReadsPercent: '4%',  
      spikeReadsPercent: '2.29%',       
      spike: 'Emesvirus zinderi',
    },
    {
      key: '2',
      totalReads: 150000,
      totalReadsAfterFiltering: 140000,
      humanMappedReads: 60000,
      humanKrakenReads: 4000,
      totalHumanReadsPercent: '45.71%',
      bacterialReadsPercent: '25.71%', 
      virusReadsPercent: '2.14%',      
      eukaryoteReadsPercent: '5%',    
      otherReadsPercent: '2.14%',       
      unclassifiedReadsPercent: '2.86%',
      spikeReadsPercent: '1.43%',     
      spike: 'Emesvirus zinderi',
    },
    {
      key: '3',
      totalReads: 200000,
      totalReadsAfterFiltering: 190000,
      humanMappedReads: 90000,
      humanKrakenReads: 7000,
      totalHumanReadsPercent: '50.53%',
      bacterialReadsPercent: '26.32%', 
      virusReadsPercent: '3.16%',       
      eukaryoteReadsPercent: '4.74%',   
      otherReadsPercent: '1.58%',       
      unclassifiedReadsPercent: '2.11%',
      spikeReadsPercent: '1.58%',       
      spike: 'Emesvirus zinderi',
    },
    {
      key: '4',
      totalReads: 160000,
      totalReadsAfterFiltering: 155000,
      humanMappedReads: 70000,
      humanKrakenReads: 4000,
      totalHumanReadsPercent: '47.74%', 
      bacterialReadsPercent: '22.58%',  
      virusReadsPercent: '1.94%',       
      eukaryoteReadsPercent: '3.87%',   
      otherReadsPercent: '1.94%',      
      unclassifiedReadsPercent: '3.23%',
      spikeReadsPercent: '2.58%',       
      spike: 'Emesvirus zinderi',
    },
  ];
  

  
  const columns = [
    {
      title: 'Total Reads',
      dataIndex: 'totalReads',
      key: 'totalReads',
    },
    {
      title: 'Total Reads After Filtering',
      dataIndex: 'totalReadsAfterFiltering',
      key: 'totalReadsAfterFiltering',
    },
    {
      title: 'Human Mapped Reads',
      dataIndex: 'humanMappedReads',
      key: 'humanMappedReads',
    },
    {
      title: 'Human Kraken Reads',
      dataIndex: 'humanKrakenReads',
      key: 'humanKrakenReads',
    },
    {
      title: 'Total Human Reads',
      dataIndex: 'totalHumanReadsPercent',
      key: 'totalHumanReadsPercent',
    },
    {
      title: 'Bacterial Reads',
      dataIndex: 'bacterialReadsPercent',
      key: 'bacterialReadsPercent',
    },
    {
      title: 'Virus Reads',
      dataIndex: 'virusReadsPercent',
      key: 'virusReadsPercent',
    },
    {
      title: 'Eukaryote Reads',
      dataIndex: 'eukaryoteReadsPercent',
      key: 'eukaryoteReadsPercent',
    },
    {
      title: 'Other Reads',
      dataIndex: 'otherReadsPercent',
      key: 'otherReadsPercent',
    },
    {
      title: 'Unclassified Reads',
      dataIndex: 'unclassifiedReadsPercent',
      key: 'unclassifiedReadsPercent',
    },
    {
      title: 'Spike Reads',
      dataIndex: 'spikeReadsPercent',
      key: 'spikeReadsPercent',
    },
    {
      title: 'Spike Used',
      dataIndex: 'spike',
      key: 'spike',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button icon={<DownloadOutlined />} onClick={() => message.success('Download')} />
      ),
    },
  ];
  
  



  return (
    <Table<QualityControlData>
      dataSource={qualityControlData.length ? qualityControlData:  mockData}
      columns={columns}
      bordered
    />
  )
}