import { Button, message, Table } from "antd"
import { DownloadOutlined } from '@ant-design/icons'; 
import { qualityControlData } from "../mock/qualityControlData";


export const QualityControl = () => {

  
  
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
    <Table dataSource={qualityControlData} columns={columns} bordered/>
  )
}