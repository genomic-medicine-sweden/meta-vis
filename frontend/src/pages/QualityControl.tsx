import { Button, message, Table } from "antd"
import { DownloadOutlined } from '@ant-design/icons'; 


export const QualityControl = () => {

  const data = [
    {
      key: '1',
      totalBases: 18000000,
      rawReads: 120000,
      trimmedReads: 115000,
      filteredReads: 110000,
      mappedToHost: 85000,
      inputReads: 100000,
      unclassifiedReads: 12000,
      assignedTo: {
        homoSapiens: 55000,
        fungi: 25000,
        archaea: 8000,
        bacteria: 17000,
        viruses: 12000,
      },
      analysisDate: '2024-09-20',
      sampleID: 'SAMPLE123',
      projectID: 'PROJ001',
    },
    {
      key: '2',
      totalBases: 15000000,
      rawReads: 95000,
      trimmedReads: 90000,
      filteredReads: 85000,
      mappedToHost: 60000,
      inputReads: 80000,
      unclassifiedReads: 4000,
      assignedTo: {
        homoSapiens: 25000,
        fungi: 10000,
        archaea: 5000,
        bacteria: 15000,
        viruses: 5000,
      },
      analysisDate: '2024-09-22',
      sampleID: 'SAMPLE456',
      projectID: 'PROJ002',
    },
    {
      key: '3',
      totalBases: 20000000,
      rawReads: 140000,
      trimmedReads: 135000,
      filteredReads: 130000,
      mappedToHost: 95000,
      inputReads: 120000,
      unclassifiedReads: 15000,
      assignedTo: {
        homoSapiens: 70000,
        fungi: 30000,
        archaea: 10000,
        bacteria: 20000,
        viruses: 25000,
      },
      analysisDate: '2024-09-23',
      sampleID: 'SAMPLE789',
      projectID: 'PROJ003',
    },
    {
      key: '4',
      totalBases: 16000000,
      rawReads: 110000,
      trimmedReads: 105000,
      filteredReads: 100000,
      mappedToHost: 80000,
      inputReads: 90000,
      unclassifiedReads: 3000,
      assignedTo: {
        homoSapiens: 40000,
        fungi: 15000,
        archaea: 6000,
        bacteria: 12000,
        viruses: 10000,
      },
      analysisDate: '2024-09-24',
      sampleID: 'SAMPLE012',
      projectID: 'PROJ004',
    },
  ];

  
  const columns = [
    {
      title: 'Total Bases',
      dataIndex: 'totalBases',
      key: 'totalBases',
    },
    {
      title: 'Number of Raw Reads',
      dataIndex: 'rawReads',
      key: 'rawReads',
    },
    {
      title: 'Trimmed Reads',
      dataIndex: 'trimmedReads',
      key: 'trimmedReads',
    },
    {
      title: 'Filtered Reads',
      dataIndex: 'filteredReads',
      key: 'filteredReads',
    },
    {
      title: 'Reads Mapped to Host Genome (Human)',
      dataIndex: 'mappedToHost',
      key: 'mappedToHost',
    },
    {
      title: 'Input Reads for Classifiers',
      dataIndex: 'inputReads',
      key: 'inputReads',
    },
    {
      title: 'Unclassified Reads',
      dataIndex: 'unclassifiedReads',
      key: 'unclassifiedReads',
    },
    {
      title: 'Reads Assigned to Homo Sapiens',
      dataIndex: ['assignedTo', 'homoSapiens'],
      key: 'homoSapiens',
    },
    {
      title: 'Reads Assigned to Fungi',
      dataIndex: ['assignedTo', 'fungi'],
      key: 'fungi',
    },
    {
      title: 'Reads Assigned to Archaea',
      dataIndex: ['assignedTo', 'archaea'],
      key: 'archaea',
    },
    {
      title: 'Reads Assigned to Bacteria',
      dataIndex: ['assignedTo', 'bacteria'],
      key: 'bacteria',
    },
    {
      title: 'Reads Assigned to Viruses',
      dataIndex: ['assignedTo', 'viruses'],
      key: 'viruses',
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
    <Table dataSource={data} columns={columns} bordered/>
  )
}