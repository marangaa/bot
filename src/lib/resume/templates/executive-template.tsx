import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TemplateProps } from '@/types/resume';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fefefe',
    padding: 35,
    fontFamily: 'Helvetica',
    color: '#1a202c',
  },
  
  headerSection: {
    backgroundColor: '#1a202c',
    marginHorizontal: -35,
    marginTop: -35,
    padding: 35,
    paddingBottom: 25,
    color: '#ffffff',
    marginBottom: 25,
  },
  
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    color: '#f7fafc',
  },
  
  title: {
    fontSize: 16,
    color: '#d4af37',
    marginBottom: 15,
    fontFamily: 'Helvetica-Bold',
  },
  
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  
  contactItem: {
    fontSize: 10,
    color: '#cbd5e0',
  },
  
  mainContent: {
    flexDirection: 'row',
    gap: 25,
  },
  
  leftColumn: {
    width: '32%',
  },
  
  rightColumn: {
    width: '66%',
  },
  
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#1a202c',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#d4af37',
    paddingBottom: 4,
  },
  
  summaryCard: {
    backgroundColor: '#f7fafc',
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
    marginBottom: 20,
  },
  
  summary: {
    fontSize: 10,
    color: '#2d3748',
    lineHeight: 1.6,
  },
  
  skillsGrid: {
    marginBottom: 20,
  },
  
  skillCategory: {
    marginBottom: 12,
  },
  
  skillCategoryTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#d4af37',
    marginBottom: 6,
  },
  
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  
  skill: {
    fontSize: 9,
    color: '#4a5568',
    backgroundColor: '#edf2f7',
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    marginBottom: 3,
  },
  
  experienceSection: {
    marginBottom: 20,
  },
  
  experienceItem: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 15,
  },
  
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  
  jobInfo: {
    flex: 1,
  },
  
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#1a202c',
    marginBottom: 2,
  },
  
  company: {
    fontSize: 11,
    color: '#d4af37',
    fontFamily: 'Helvetica-Bold',
  },
  
  period: {
    fontSize: 9,
    color: '#718096',
    textAlign: 'right',
  },
  
  achievements: {
    marginTop: 8,
  },
  
  achievement: {
    fontSize: 9,
    color: '#4a5568',
    marginBottom: 4,
    paddingLeft: 12,
    lineHeight: 1.4,
  },
});

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, personalInfo }) => {
  const skillCategories = [
    { title: 'Technical', skills: Array.isArray(data.skills) ? data.skills.slice(0, 6) : [] },
    { title: 'Management', skills: Array.isArray(data.skills) ? data.skills.slice(6, 10) : [] },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerSection}>
          <Text style={styles.name}>{personalInfo?.fullName || 'Full Name'}</Text>
          <Text style={styles.title}>Executive Professional</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{personalInfo?.email}</Text>
            <Text style={styles.contactItem}>{personalInfo?.phone}</Text>
            <Text style={styles.contactItem}>{personalInfo?.location}</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Core Skills</Text>
            <View style={styles.skillsGrid}>
              {skillCategories.map((category, index) => (
                <View key={index} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{category.title}</Text>
                  <View style={styles.skillList}>
                    {category.skills.map((skill, skillIndex) => (
                      <Text key={skillIndex} style={styles.skill}>{skill}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            <View style={styles.experienceSection}>
              {data.experiences && data.experiences.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.jobInfo}>
                      <Text style={styles.jobTitle}>{exp.title}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <Text style={styles.period}>{exp.period}</Text>
                  </View>
                  <View style={styles.achievements}>
                    {(exp.highlights || []).slice(0, 4).map((achievement, i) => (
                      <Text key={i} style={styles.achievement}>• {achievement}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
