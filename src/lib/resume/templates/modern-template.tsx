import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TemplateProps } from '@/types/resume';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#2d3748',
  },
  
  sidebar: {
    width: '35%',
    backgroundColor: '#2563eb',
    padding: 20,
    color: '#ffffff',
  },
  
  main: {
    width: '65%',
    padding: 20,
  },
  
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#ffffff',
  },
  
  title: {
    fontSize: 12,
    marginBottom: 16,
    color: '#bfdbfe',
  },
  
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  
  contactItem: {
    fontSize: 9,
    marginBottom: 4,
    color: '#e2e8f0',
  },
  
  skillItem: {
    fontSize: 9,
    marginBottom: 4,
    color: '#e2e8f0',
  },
  
  mainSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#1a202c',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 2,
  },
  
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#4a5568',
    marginBottom: 16,
  },
  
  experienceItem: {
    marginBottom: 14,
  },
  
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a202c',
  },
  
  company: {
    fontSize: 10,
    color: '#2563eb',
    fontFamily: 'Helvetica-Bold',
  },
  
  period: {
    fontSize: 9,
    color: '#718096',
  },
  
  achievement: {
    fontSize: 9,
    marginBottom: 2,
    paddingLeft: 10,
    color: '#4a5568',
  },
});

export const ModernTemplate: React.FC<TemplateProps> = ({ data, personalInfo }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <Text style={styles.name}>{personalInfo?.fullName || 'Full Name'}</Text>
          <Text style={styles.title}>Professional</Text>
          
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.contactItem}>{personalInfo?.email}</Text>
          <Text style={styles.contactItem}>{personalInfo?.phone}</Text>
          <Text style={styles.contactItem}>{personalInfo?.location}</Text>
          
          <Text style={styles.sectionTitle}>Skills</Text>
          {Array.isArray(data.skills) && data.skills.slice(0, 10).map((skill, index) => (
            <Text key={index} style={styles.skillItem}>• {skill}</Text>
          ))}
        </View>

        <View style={styles.main}>
          <Text style={styles.mainSectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
          
          <Text style={styles.mainSectionTitle}>Experience</Text>
          {data.experiences && data.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.period}>{exp.period}</Text>
              {(exp.highlights || []).map((achievement, i) => (
                <Text key={i} style={styles.achievement}>• {achievement}</Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
