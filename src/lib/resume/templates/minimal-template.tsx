import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TemplateProps } from '@/types/resume';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#2d3748',
    lineHeight: 1.5,
  },
  
  header: {
    marginBottom: 30,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 20,
  },
  
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#1a202c',
    marginBottom: 8,
  },
  
  title: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 12,
  },
  
  contactLine: {
    fontSize: 10,
    color: '#4a5568',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  
  contactItem: {
    marginHorizontal: 8,
  },
  
  section: {
    marginBottom: 24,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1a202c',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  
  summary: {
    fontSize: 11,
    color: '#4a5568',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  
  experienceItem: {
    marginBottom: 18,
  },
  
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#1a202c',
  },
  
  company: {
    fontSize: 11,
    color: '#2d3748',
    fontFamily: 'Helvetica-Bold',
  },
  
  period: {
    fontSize: 10,
    color: '#718096',
  },
  
  achievements: {
    paddingLeft: 0,
  },
  
  achievement: {
    fontSize: 10,
    color: '#4a5568',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  skill: {
    fontSize: 10,
    color: '#2d3748',
    marginBottom: 6,
  },
});

export const MinimalTemplate: React.FC<TemplateProps> = ({ data, personalInfo }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.fullName || 'Full Name'}</Text>
          <Text style={styles.title}>Professional</Text>
          <View style={styles.contactLine}>
            <Text style={styles.contactItem}>{personalInfo?.email}</Text>
            <Text style={styles.contactItem}>•</Text>
            <Text style={styles.contactItem}>{personalInfo?.phone}</Text>
            <Text style={styles.contactItem}>•</Text>
            <Text style={styles.contactItem}>{personalInfo?.location}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experiences && data.experiences.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.jobHeader}>
                <View>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                </View>
                <Text style={styles.period}>{exp.period}</Text>
              </View>
              <View style={styles.achievements}>
                {(exp.highlights || []).map((achievement, i) => (
                  <Text key={i} style={styles.achievement}>• {achievement}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {Array.isArray(data.skills) && data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
