import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Theme, useTheme } from '../../styles';
import { BodyText, HeadingSmall, TagText } from '../Typography';

export type ReviewCardProps = {
  name: string;
  date: string;
  description: string;
  numberOfReply: number;
};

interface FeedbackItem {
  icon: JSX.Element;
  text: string;
}

export const ReviewCard = ({ name, date, numberOfReply, description }: ReviewCardProps) => {
  const { theme } = useTheme();
  const _s = theme.utilities;
  const styles = createStyleSheet(theme);

  const feedback = [
    {
      icon: (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <Path
            d="M4.86654 7.60019L6.7332 2.0002C6.7548 1.9518 6.78579 1.90817 6.82439 1.87186C6.86299
            1.83554 6.90842 1.80726 6.95804 1.78865C7.00766 1.77004 7.06049 1.76148 7.11345 1.76346C7.16641
            1.76544 7.21844 1.77793 7.26654 1.8002L7.9332 2.13353C8.21391 2.27957 8.44929 2.49967 8.61382
            2.76996C8.77835 3.04026 8.86574 3.35043 8.86654 3.66686V6.26686H13.1332C13.3346 6.27053 13.5326
            6.31979 13.7123 6.41095C13.8919 6.50211 14.0486 6.6328 14.1705 6.7932C14.2924 6.95359 14.3764
            7.13953 14.4161 7.33703C14.4558 7.53453 14.4503 7.73847 14.3999 7.93353L13.0665 13.2669C12.9937
            13.5491 12.8304 13.7997 12.6017 13.9803C12.3729 14.1609 12.0913 14.2615 11.7999 14.2669H2.86654C2.51291
            14.2669 2.17378 14.1264 1.92373 13.8763C1.67368 13.6263 1.5332 13.2872 1.5332 12.9335V8.93353C1.5332
            8.57991 1.67368 8.24077 1.92373 7.99072C2.17378 7.74067 2.51291 7.60019
            2.86654 7.60019H4.86654ZM4.86654 7.60019V14.2669"
            stroke={theme.colors.primary}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      text: 'Helpful'
    },
    {
      icon: (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <Path
            d="M13.3332 8.6665V11.9998C13.3332 12.7362 12.7362 13.3332 11.9998
            13.3332H3.99984C3.26346 13.3332 2.6665 12.7362 2.6665 11.9998V8.6665"
            stroke={theme.colors.primary}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M10.6663 5.33317L7.99967 2.6665M7.99967 2.6665L5.33301 5.33317M7.99967 2.6665V10.6665"
            stroke={theme.colors.primary}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
      text: 'Share'
    },
    {
      icon: (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.3335 0.833496C3.60964 0.833496 3.8335 1.05736 3.8335 1.3335V2.05693L4.88255
            1.84712C6.07802 1.60802 7.31723 1.7218 8.44916 2.17457L8.5849 2.22888C9.5281 2.60615 10.5662 2.6766
            11.5517 2.43022C12.3721 2.22512 13.1668 2.84563 13.1668 3.69129V8.60263C13.1668 9.26163 12.7184 9.83603
            12.079 9.99583L11.9361 10.0316C10.6544 10.352 9.30436 10.2604 8.07776
            9.7697C7.1259 9.38896 6.08391 9.29329
            5.07867 9.49436L3.8335 9.74343V14.6668C3.8335 14.943 3.60964 15.1668 3.3335
            15.1668C3.05736 15.1668 2.8335 14.943
            2.8335 14.6668V1.3335C2.8335 1.05736 3.05736 0.833496 3.3335 0.833496ZM3.8335
            8.72356L4.88255 8.51376C6.07802 8.2747
            7.31723 8.3885 8.44916 8.84123C9.48056 9.25383 10.6158 9.33083 11.6936 9.06143L11.8365
            9.02569C12.0306 8.97716 12.1668
            8.80276 12.1668 8.60263V3.69129C12.1668 3.4962 11.9835
            3.35305 11.7942 3.40037C10.6048 3.69773 9.3519 3.6127 8.2135
            3.15735L8.07776 3.10305C7.1259 2.72232 6.08391 2.62665 5.07867 2.8277L3.8335 3.07673V8.72356Z"
            fill={theme.colors.primary}
          />
        </Svg>
      ),
      text: 'Report'
    }
  ];

  const iconText = (items: FeedbackItem[]) =>
    items.map(({ icon, text }, index) => (
      <Pressable
        key={index}
        style={({ pressed }) => [_s.flex_dir_row, _s.align_items_center, { gap: 5 }, pressed && { opacity: 0.5 }]}
      >
        <View style={{ width: 16, height: 16 }}>{icon}</View>
        <TagText style={{ color: theme.colors.primary }}>{text}</TagText>
      </Pressable>
    ));

  return (
    <View style={[styles.container, _s.px_2, _s.py_2, _s.gap_1]}>
      <View style={[_s.flex_dir_row, _s.justify_content_between, _s.align_items_center]}>
        <View style={[_s.flex_dir_row, _s.gap_2, _s.align_items_center]}>
          <Image style={styles.image} source={require('../../assets/images/profilePic.png')} />
          <View>
            <HeadingSmall>{name}</HeadingSmall>
            <BodyText style={{ opacity: 0.5 }}>{date}</BodyText>
          </View>
        </View>
        <View style={[_s.align_items_center]}>
          <Svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <Path
              d="M7.13589 1.23359C7.52162 0.57132 8.47838 0.571321 8.86411 1.23359L10.6878 4.36458C10.8291
              4.60718 11.0658 4.77921 11.3402 4.83863L14.8815 5.60548C15.6306 5.76769 15.9262 6.67761 15.4156
              7.24912L13.0013 9.95103C12.8143 10.1604 12.7238 10.4387 12.7521 10.7181L13.1171 14.323C13.1943
              15.0855 12.4203 15.6479 11.719 15.3388L8.40325 13.8777C8.14634 13.7645 7.85366 13.7645 7.59675
              13.8777L4.28104 15.3388C3.57971 15.6479 2.80568 15.0855 2.88288 14.323L3.24788 10.7181C3.27616
              10.4387 3.18572 10.1604 2.99866 9.95103L0.584442 7.24912C0.0737871 6.67761 0.369441 5.76769 1.11849
              5.60548L4.65978 4.83863C4.93417 4.77921 5.17095 4.60718 5.31225 4.36458L7.13589 1.23359Z"
              fill={theme.colors.primary}
            />
          </Svg>
          <Text style={{ fontSize: 10, fontWeight: '700' }}>10K</Text>
        </View>
      </View>
      <View style={[_s.gap_3]}>
        <View style={[_s.gap_1]}>
          <BodyText style={{ fontWeight: '500', opacity: 0.6 }}>{description}</BodyText>
          <Pressable>
            <BodyText style={{ fontWeight: '600', color: theme.colors.primary }}>Reply</BodyText>
          </Pressable>
          <Pressable>
            <BodyText style={{ fontWeight: '700' }}>View {numberOfReply} Replies</BodyText>
          </Pressable>
        </View>
        <View style={[_s.flex_dir_row, _s.gap_3]}>{iconText(feedback)}</View>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.lightGray,
      borderRadius: 32
    },
    image: {
      width: 33,
      height: 33,
      borderRadius: 50,
      resizeMode: 'cover'
    },
    iconText: {
      color: theme.colors.primary
    }
  });
