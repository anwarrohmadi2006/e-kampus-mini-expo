import 'react-native-gesture-handler';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NavigationContainer,
  RouteProp,
  Theme,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

type Course = {
  id: string;
  name: string;
  code: string;
  credits: number;
  lecturer: string;
  schedule: string;
  room: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  accent: string;
  grade: string;
};

const COLORS = {
  background: '#F9F9FB',
  surface: '#FFFFFF',
  surfaceLow: '#F3F3F5',
  surfaceHigh: '#E8E8EA',
  primary: '#000666',
  primaryContainer: '#1A237E',
  primarySoft: '#E0E0FF',
  secondary: '#705D00',
  secondarySoft: '#FFE16D',
  text: '#1A1C1D',
  textMuted: '#5B5C68',
};

const STUDENT = {
  name: 'Rizky Pratama',
  nim: '2023-0451',
  major: 'S1 Informatika',
  faculty: 'Fakultas Ilmu Komputer',
  semester: '5 (Lima)',
  email: 'rizky.pratama@student.univ.ac.id',
  phone: '+62 812-3456-7890',
  address: 'Jl. Pendidikan No. 42, Jakarta Selatan',
  status: 'Aktif',
  gpa: '3.85',
  passedCredits: '92 SKS',
  avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
};

const COURSES: Course[] = [
  {
    id: 'algoritma',
    name: 'Algoritma dan Pemrograman',
    code: 'IF204',
    credits: 3,
    lecturer: 'Dr. Irwan Santoso',
    schedule: 'Senin, 08:00 - 10:30',
    room: 'Lab Komputer 302',
    description: 'Membahas pemecahan masalah, flowchart, pseudocode, dan implementasi dasar algoritma.',
    icon: 'console-line',
    accent: '#1A237E',
    grade: 'A',
  },
  {
    id: 'basis-data',
    name: 'Basis Data',
    code: 'IF306',
    credits: 3,
    lecturer: 'Heri Setiawan, M.Kom',
    schedule: 'Rabu, 14:00 - 16:30',
    room: 'Lab Komputer 301',
    description: 'Perancangan ERD, normalisasi, SQL, serta implementasi sistem basis data relasional.',
    icon: 'database-outline',
    accent: '#705D00',
    grade: 'A-',
  },
  {
    id: 'rpl',
    name: 'Rekayasa Perangkat Lunak',
    code: 'IF405',
    credits: 3,
    lecturer: 'Dr. Sinta Lestari',
    schedule: 'Kamis, 08:00 - 10:30',
    room: 'Gedung A 204',
    description: 'Mencakup SDLC, analisis kebutuhan, UML, agile workflow, dan quality assurance.',
    icon: 'cog-outline',
    accent: '#1A237E',
    grade: 'B+',
  },
  {
    id: 'mobile',
    name: 'Pemrograman Mobile',
    code: 'IF502',
    credits: 2,
    lecturer: 'Andi Maulana, M.T.',
    schedule: 'Jumat, 09:00 - 11:00',
    room: 'Studio App 5',
    description: 'Praktik pengembangan aplikasi Android dan React Native dengan pendekatan proyek.',
    icon: 'cellphone',
    accent: '#705D00',
    grade: 'A',
  },
];

const WEEKLY_SCHEDULE = [
  [
    { title: 'Algoritma dan Pemrograman', time: '08:00 - 10:30', room: 'Lab 302', lecturer: 'Irwan Santoso' },
    { title: 'Matematika Diskrit', time: '13:00 - 15:30', room: 'B-401', lecturer: 'Dewi Rahma' },
  ],
  [{ title: 'Sistem Operasi', time: '09:00 - 11:30', room: 'C-202', lecturer: 'Prof. Andi M.' }],
  [
    { title: 'Pemrograman Web', time: '08:00 - 10:30', room: 'Lab Multimedia', lecturer: 'Rina Kusuma' },
    { title: 'Basis Data', time: '14:00 - 16:30', room: 'Lab 301', lecturer: 'Heri Setiawan' },
  ],
  [{ title: 'Rekayasa Perangkat Lunak', time: '08:00 - 10:30', room: 'A-204', lecturer: 'Sinta Lestari' }],
  [{ title: 'Pemrograman Mobile', time: '09:00 - 11:00', room: 'Studio App 5', lecturer: 'Andi Maulana' }],
];

type CourseStackParamList = {
  CourseList: undefined;
  CourseDetail: { course: Course };
};

type HomeTabParamList = {
  MataKuliah: undefined;
  Nilai: undefined;
  ProfilMahasiswa: undefined;
};

type DrawerParamList = {
  Beranda: undefined;
  JadwalKuliah: undefined;
  Pengumuman: undefined;
  TentangKampus: undefined;
};

const theme: Theme = {
  dark: false,
  colors: {
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.text,
    border: 'transparent',
    notification: COLORS.secondarySoft,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();
const CourseStack = createStackNavigator<CourseStackParamList>();

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="dark" />
      <Drawer.Navigator
        initialRouteName="Beranda"
        drawerContent={(props) => <CampusDrawerContent {...props} />}
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: COLORS.primary,
          headerTitleStyle: styles.headerTitle,
          sceneStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Drawer.Screen
          name="Beranda"
          component={HomeTabs}
          options={{
            title: 'E-Kampus',
            headerShown: false,
            drawerIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="JadwalKuliah"
          component={ScheduleScreen}
          options={{
            title: 'Jadwal Kuliah',
            drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Pengumuman"
          component={AnnouncementsScreen}
          options={{
            title: 'Pengumuman',
            drawerIcon: ({ color, size }) => <Ionicons name="megaphone-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="TentangKampus"
          component={AboutCampusScreen}
          options={{
            title: 'Tentang Kampus',
            drawerIcon: ({ color, size }) => <Ionicons name="school-outline" size={size} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: styles.header,
        headerTintColor: COLORS.primary,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.surface,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size, focused }) => {
          const iconMap: Record<keyof HomeTabParamList, keyof typeof Ionicons.glyphMap> = {
            MataKuliah: focused ? 'school' : 'school-outline',
            Nilai: focused ? 'stats-chart' : 'stats-chart-outline',
            ProfilMahasiswa: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveBackgroundColor: COLORS.primaryContainer,
      })}
    >
      <Tab.Screen
        name="MataKuliah"
        component={CourseStackNavigator}
        options={{ title: 'Mata Kuliah', headerShown: false }}
      />
      <Tab.Screen
        name="Nilai"
        component={GradesScreen}
        options={{ title: 'Nilai', tabBarBadge: 3 }}
      />
      <Tab.Screen
        name="ProfilMahasiswa"
        component={ProfileScreen}
        options={{ title: 'Profil Mahasiswa' }}
      />
    </Tab.Navigator>
  );
}

function CourseStackNavigator() {
  return (
    <CourseStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: COLORS.primary,
        headerTitleStyle: styles.headerTitle,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <CourseStack.Screen name="CourseList" component={CourseListScreen} options={{ title: 'Mata Kuliah' }} />
      <CourseStack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Detail Mata Kuliah' }} />
    </CourseStack.Navigator>
  );
}

function CampusDrawerContent(props: DrawerContentComponentProps) {
  const labelMap: Record<keyof DrawerParamList, string> = {
    Beranda: 'Beranda',
    JadwalKuliah: 'Jadwal Kuliah',
    Pengumuman: 'Pengumuman',
    TentangKampus: 'Tentang Kampus',
  };
  const iconMap: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
    Beranda: 'grid-outline',
    JadwalKuliah: 'calendar-outline',
    Pengumuman: 'megaphone-outline',
    TentangKampus: 'school-outline',
  };

  return (
    <SafeAreaView style={styles.drawerShell}>
      <View style={styles.drawerProfile}>
        <Image source={{ uri: STUDENT.avatar }} style={styles.drawerAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.drawerName}>{STUDENT.name}</Text>
          <Text style={styles.drawerMeta}>{STUDENT.major}</Text>
          <Text style={styles.drawerMeta}>{STUDENT.nim}</Text>
        </View>
      </View>
      {props.state.routeNames.map((name, index) => {
        const routeName = name as keyof DrawerParamList;
        const route = props.state.routes[index];
        const focused = props.state.index === index;
        return (
          <Pressable
            key={route.key}
            onPress={() => props.navigation.navigate(name)}
            style={[styles.drawerItem, focused && styles.drawerItemActive]}
          >
            <Ionicons name={iconMap[routeName]} size={20} color={focused ? COLORS.primary : COLORS.textMuted} />
            <Text style={[styles.drawerLabel, focused && styles.drawerLabelActive]}>{labelMap[routeName]}</Text>
          </Pressable>
        );
      })}
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerFooterLabel}>Portal Akademik Terpadu</Text>
        <Text style={styles.drawerFooterValue}>Semester Ganjil 2023/2024</Text>
      </View>
    </SafeAreaView>
  );
}

function CourseListScreen({ navigation }: { navigation: StackNavigationProp<CourseStackParamList, 'CourseList'> }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 700;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <HeroBanner
        eyebrow="Academic Year 2023/2024"
        title="Daftar Mata Kuliah"
        subtitle="Palet navy-gold, permukaan bertingkat, dan kartu akademik mengikuti referensi stitch."
      />
      <QuickNavigateCard />
      <View style={[styles.courseGrid, isWide && { flexDirection: 'row', flexWrap: 'wrap' }]}>
        {COURSES.map((course) => (
          <Pressable
            key={course.id}
            style={[styles.courseCard, isWide && styles.courseCardWide]}
            onPress={() => navigation.navigate('CourseDetail', { course })}
          >
            <View style={styles.courseBadgeRow}>
              <View style={[styles.courseIconWrap, { backgroundColor: `${course.accent}14` }]}>
                <MaterialCommunityIcons name={course.icon} size={28} color={course.accent} />
              </View>
              <View style={styles.gradeBadge}>
                <Text style={styles.gradeBadgeText}>{course.grade}</Text>
              </View>
            </View>
            <Text style={styles.courseTitle}>{course.name}</Text>
            <Text style={styles.courseSub}>{course.code} • {course.credits} SKS</Text>
            <View style={styles.metaRow}>
              <Ionicons name="time-outline" size={16} color={COLORS.textMuted} />
              <Text style={styles.metaText}>{course.schedule}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="person-outline" size={16} color={COLORS.textMuted} />
              <Text style={styles.metaText}>{course.lecturer}</Text>
            </View>
            <View style={styles.courseCta}>
              <Text style={styles.courseCtaText}>Lihat detail</Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function QuickNavigateCard() {
  const navigation = useNavigation<StackNavigationProp<CourseStackParamList>>();
  return (
    <Pressable
      style={styles.quickCard}
      onPress={() => navigation.navigate('CourseDetail', { course: COURSES[0] })}
    >
      <View>
        <Text style={styles.quickEyebrow}>Bonus Hook</Text>
        <Text style={styles.quickTitle}>Buka detail MK dari komponen reusable</Text>
        <Text style={styles.quickBody}>Komponen ini tidak menerima `navigation` prop langsung dan memakai `useNavigation()`.</Text>
      </View>
      <Ionicons name="arrow-forward-circle" size={28} color={COLORS.surface} />
    </Pressable>
  );
}

function CourseDetailScreen({
  route,
  navigation,
}: {
  route: RouteProp<CourseStackParamList, 'CourseDetail'>;
  navigation: StackNavigationProp<CourseStackParamList, 'CourseDetail'>;
}) {
  const { course } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: course.name });
  }, [course.name, navigation]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <View style={styles.detailHero}>
        <View style={[styles.detailHeroIcon, { backgroundColor: `${course.accent}18` }]}>
          <MaterialCommunityIcons name={course.icon} size={36} color={course.accent} />
        </View>
        <Text style={styles.detailHeroTitle}>{course.name}</Text>
        <Text style={styles.detailHeroCode}>{course.code}</Text>
      </View>
      <View style={styles.detailCard}>
        <DetailRow label="Nama Mata Kuliah" value={course.name} />
        <DetailRow label="SKS" value={`${course.credits} SKS`} />
        <DetailRow label="Dosen" value={course.lecturer} />
        <DetailRow label="Jadwal" value={course.schedule} />
        <DetailRow label="Ruangan" value={course.room} />
        <DetailRow label="Deskripsi" value={course.description} last />
      </View>
    </ScrollView>
  );
}

function GradesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <HeroBanner
        eyebrow="Academic Performance"
        title="Nilai Semester"
        subtitle="Ringkasan nilai dibuat konsisten dengan hero editorial dan kartu tonal."
      />
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>IP Semester</Text>
          <Text style={styles.summaryValue}>3.78</Text>
        </View>
        <View style={styles.summaryChip}>
          <Text style={styles.summaryChipText}>Top 12%</Text>
        </View>
      </View>
      {COURSES.map((course) => (
        <View key={course.id} style={styles.gradeRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.gradeCourse}>{course.name}</Text>
            <Text style={styles.gradeMeta}>{course.code} • {course.credits} SKS</Text>
          </View>
          <View style={styles.gradePill}>
            <Text style={styles.gradePillText}>{course.grade}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <View style={styles.profileHero}>
        <Image source={{ uri: STUDENT.avatar }} style={styles.profileAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>{STUDENT.name}</Text>
          <Text style={styles.profileMajor}>{STUDENT.major}</Text>
          <View style={styles.gpaBadge}>
            <Text style={styles.gpaLabel}>IPK Kumulatif</Text>
            <Text style={styles.gpaValue}>{STUDENT.gpa}</Text>
          </View>
        </View>
      </View>
      <SectionTitle title="Status Akademik" />
      <View style={styles.doubleCardRow}>
        <MetricCard label="Status" value={STUDENT.status} />
        <MetricCard label="Semester" value={STUDENT.semester} />
      </View>
      <View style={styles.doubleCardRow}>
        <MetricCard label="SKS Lulus" value={STUDENT.passedCredits} />
        <MetricCard label="Fakultas" value="Ilmu Komputer" />
      </View>
      <SectionTitle title="Data Diri Lengkap" />
      <View style={styles.detailCard}>
        <DetailRow label="NIM" value={STUDENT.nim} />
        <DetailRow label="Program Studi" value={STUDENT.major} />
        <DetailRow label="Fakultas" value={STUDENT.faculty} />
        <DetailRow label="Email Kampus" value={STUDENT.email} />
        <DetailRow label="Nomor HP" value={STUDENT.phone} />
        <DetailRow label="Alamat" value={STUDENT.address} last />
      </View>
    </ScrollView>
  );
}

function ScheduleScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <HeroBanner
        eyebrow="Week View"
        title="Jadwal Kuliah Mingguan"
        subtitle="Tabel mingguan dalam format kolom harian, mengikuti komposisi referensi jadwal."
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scheduleWrap}>
        {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day, index) => (
          <View key={day} style={styles.dayColumn}>
            <Text style={styles.dayTitle}>{day}</Text>
            {WEEKLY_SCHEDULE[index].map((item) => (
              <View key={`${day}-${item.title}`} style={styles.scheduleCard}>
                <Text style={styles.scheduleTime}>{item.time}</Text>
                <Text style={styles.scheduleCourse}>{item.title}</Text>
                <Text style={styles.scheduleMeta}>{item.room}</Text>
                <Text style={styles.scheduleMeta}>{item.lecturer}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

function AnnouncementsScreen() {
  const announcements = [
    ['Batas KRS', 'Pengisian KRS semester ganjil dibuka hingga 12 April 2026.'],
    ['Kuliah Tamu', 'Kuliah tamu AI Mobile Systems berlangsung Jumat, 10 April 2026.'],
    ['Pemeliharaan Sistem', 'Portal akademik maintenance pukul 22:00 sampai 23:30 WIB.'],
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <HeroBanner
        eyebrow="Campus Updates"
        title="Pengumuman"
        subtitle="Informasi penting kampus ditampilkan sebagai lembar informasi yang cepat dipindai."
      />
      {announcements.map(([title, body]) => (
        <View key={title} style={styles.announcementCard}>
          <Text style={styles.announcementTitle}>{title}</Text>
          <Text style={styles.announcementBody}>{body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function AboutCampusScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <HeroBanner
        eyebrow="Institution Profile"
        title="Tentang Kampus"
        subtitle="Kampus digital yang menempatkan riset, teknologi, dan pengalaman mahasiswa sebagai fokus utama."
      />
      <View style={styles.detailCard}>
        <DetailRow label="Nama Kampus" value="Universitas E-Kampus Nusantara" />
        <DetailRow label="Alamat" value="Jl. Inovasi Akademik No. 88, Jakarta" />
        <DetailRow label="Visi" value="Menjadi kampus digital unggul dalam inovasi, kolaborasi, dan dampak sosial." />
        <DetailRow
          label="Misi"
          value="Mengembangkan pembelajaran adaptif, riset terapan, dan lulusan siap industri."
          last
        />
      </View>
    </ScrollView>
  );
}

function HeroBanner({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <View style={styles.hero}>
      <Text style={styles.heroEyebrow}>{eyebrow}</Text>
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroBody}>{subtitle}</Text>
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function DetailRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.detailRow, !last && styles.detailDivider]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.background,
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContent: {
    padding: 20,
    paddingBottom: 120,
    gap: 18,
  },
  hero: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 28,
    padding: 24,
    gap: 10,
  },
  heroEyebrow: {
    color: COLORS.secondarySoft,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 11,
    fontWeight: '800',
  },
  heroTitle: {
    color: COLORS.surface,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
  },
  heroBody: {
    color: '#D5D8FF',
    fontSize: 14,
    lineHeight: 21,
  },
  drawerShell: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    gap: 8,
  },
  drawerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.surfaceHigh,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
  },
  drawerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  drawerName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
  drawerMeta: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  drawerItemActive: {
    backgroundColor: '#E7E9FF',
  },
  drawerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  drawerLabelActive: {
    color: COLORS.primary,
  },
  drawerFooter: {
    marginTop: 'auto',
    paddingTop: 18,
    gap: 4,
  },
  drawerFooterLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    fontWeight: '700',
  },
  drawerFooterValue: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 18,
    height: 72,
    borderRadius: 28,
    backgroundColor: 'rgba(249,249,251,0.96)',
    borderTopWidth: 0,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarItem: {
    marginHorizontal: 4,
    borderRadius: 20,
  },
  tabLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: '700',
  },
  quickCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  quickEyebrow: {
    color: COLORS.secondarySoft,
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  quickTitle: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
  },
  quickBody: {
    color: '#D7DAFF',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    maxWidth: '90%',
  },
  courseGrid: {
    gap: 16,
  },
  courseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    gap: 10,
  },
  courseCardWide: {
    width: '47.5%',
  },
  courseBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondarySoft,
  },
  gradeBadgeText: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: '800',
  },
  courseTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    color: COLORS.primary,
  },
  courseSub: {
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: COLORS.textMuted,
    fontSize: 13,
    flex: 1,
  },
  courseCta: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceLow,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  courseCtaText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  detailHero: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  detailHeroIcon: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailHeroTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
  detailHeroCode: {
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  detailCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  detailRow: {
    paddingVertical: 14,
    gap: 6,
  },
  detailDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F2',
  },
  detailLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '800',
  },
  detailValue: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '800',
  },
  summaryValue: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
  },
  summaryChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.secondarySoft,
  },
  summaryChipText: {
    color: COLORS.secondary,
    fontWeight: '800',
  },
  gradeRow: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  gradeCourse: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  gradeMeta: {
    color: COLORS.textMuted,
    marginTop: 4,
  },
  gradePill: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondarySoft,
  },
  gradePillText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  profileHero: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  profileAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'rgba(255,225,109,0.2)',
  },
  profileName: {
    color: COLORS.surface,
    fontSize: 28,
    fontWeight: '800',
  },
  profileMajor: {
    color: '#D7DAFF',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    marginTop: 4,
    fontWeight: '700',
  },
  gpaBadge: {
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  gpaLabel: {
    color: '#D7DAFF',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '800',
  },
  gpaValue: {
    color: COLORS.surface,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontWeight: '800',
  },
  doubleCardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceLow,
    borderRadius: 22,
    padding: 18,
    minHeight: 92,
  },
  metricLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '800',
  },
  metricValue: {
    color: COLORS.text,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
    marginTop: 8,
  },
  scheduleWrap: {
    gap: 14,
    paddingRight: 20,
  },
  dayColumn: {
    width: 232,
    gap: 12,
  },
  dayTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  scheduleCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 16,
    gap: 6,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  scheduleTime: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primarySoft,
    color: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '800',
  },
  scheduleCourse: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  scheduleMeta: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  announcementCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    gap: 8,
  },
  announcementTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  announcementBody: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
});
