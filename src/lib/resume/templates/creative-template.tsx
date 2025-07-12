import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TemplateProps } from '@/types/resume';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fafafa',
    padding: 20,
    fontFamily: 'Helvetica',
    color: '#1f2937',
  },
  
  header: {
    backgroundColor: '#6366f1',
    padding: 25,
    marginBottom: 20,
    borderRadius: 12,
    color: '#ffffff',
  },
  
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  
  title: {
    fontSize: 14,
    textAlign: 'center',
    color: '#c7d2fe',
    marginBottom: 16,
  },
  
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  
  contactItem: {
    fontSize: 10,
    color: '#e0e7ff',
    marginHorizontal: 8,
  },
  
  content: {
    flexDirection: 'row',
    gap: 20,
  },
  
  leftColumn: {
    width: '30%',
  },
  
  rightColumn: {
    width: '68%',
  },
  
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  
  cardTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  
  skillTag: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontSize: 8,
    padding: 4,
    borderRadius: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  
  experienceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  
  company: {
    fontSize: 10,
    color: '#6366f1',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  
  period: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 8,
  },
  
  achievement: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 3,
    paddingLeft: 8,
    lineHeight: 1.4,
  },
});

export const CreativeTemplate: React.FC<TemplateProps> = ({ data, personalInfo }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.fullName || 'Full Name'}</Text>
          <Text style={styles.title}>Creative Professional</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalInfo?.email}</Text>
            <Text style={styles.contactItem}>{personalInfo?.phone}</Text>
            <Text style={styles.contactItem}>{personalInfo?.location}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.leftColumn}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Skills</Text>
              <View style={styles.skillsGrid}>
                {Array.isArray(data.skills) && data.skills.slice(0, 12).map((skill, index) => (
                  <Text key={index} style={styles.skillTag}>{skill}</Text>
                ))}
              </View>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>About</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.cardTitle}>Professional Experience</Text>
            {data.experiences && data.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceCard}>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.period}>{exp.period}</Text>
                {(exp.highlights || []).slice(0, 3).map((achievement, i) => (
                  <Text key={i} style={styles.achievement}>• {achievement}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
