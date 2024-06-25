import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SettingContainer } from './SettingContainer';
import { BodyTextSmall, PrimaryButton, SecondaryButton } from '../../components';
import { Theme, useTheme } from '../../styles';

export const TermsAndConditions = () => {
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 1;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    if (isCloseToBottom && !isScrolledToEnd) {
      setIsScrolledToEnd(true);
    }
  };

  return (
    <SettingContainer title="Terms and Conditions">
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollView}
      >
        {/* eslint-disable max-len */}
        <BodyTextSmall style={styles.textContainer}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi autem consequatur ipsam, ipsum obcaecati
          sapiente tempore vitae. Aspernatur consequatur eos nemo nostrum quasi unde voluptatibus? Architecto commodi
          distinctio dolor est excepturi explicabo fuga harum ipsum laborum minima molestias neque quidem quisquam
          recusandae repellat soluta tenetur velit vero vitae, voluptatem? Neque, recusandae, voluptate? Accusamus, at,
          beatae cum debitis doloribus earum et explicabo in modi nam, natus necessitatibus qui repudiandae soluta unde
          ut velit veritatis! Accusantium aliquam aspernatur aut dolor doloribus in maiores nesciunt nobis numquam, quo
          sint tempora tempore, temporibus velit veritatis. Accusamus aliquid amet aut et magni perspiciatis quam? Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores aut, cum cumque eum, eveniet
          excepturi fuga fugiat hic iste magnam nostrum odio officiis perspiciatis placeat possimus provident quaerat
          quisquam reiciendis repellendus rerum sed suscipit voluptate voluptatibus? Ad aspernatur cum debitis dolore
          illo ipsa labore, officia porro quos reprehenderit repudiandae saepe suscipit, totam ut veniam? Accusamus
          iusto, repudiandae! A aliquid amet animi at consequuntur delectus dicta ea eaque eligendi enim excepturi
          expedita facilis fugit iste labore, laudantium minima nam nobis officia placeat quae quod recusandae sequi
          suscipit tempore tenetur unde voluptatum. Aliquam consequatur maiores, nostrum quibusdam voluptas voluptatum!
          Perspiciatis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi autem consequatur ipsam,
          ipsum obcaecati sapiente tempore vitae. Aspernatur consequatur eos nemo nostrum quasi unde voluptatibus?
          Architecto commodi distinctio dolor est excepturi explicabo fuga harum ipsum laborum minima molestias neque
          quidem quisquam recusandae repellat soluta tenetur velit vero vitae, voluptatem? Neque, recusandae, voluptate?
          Accusamus, at, beatae cum debitis doloribus earum et explicabo in modi nam, natus necessitatibus qui
          repudiandae soluta unde ut velit veritatis! Accusantium aliquam aspernatur aut dolor doloribus in maiores
          nesciunt nobis numquam, quo sint tempora tempore, temporibus velit veritatis. Accusamus aliquid amet aut et
          magni perspiciatis quam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto
          asperiores aut, cum cumque eum, eveniet excepturi fuga fugiat hic iste magnam nostrum odio officiis
          perspiciatis placeat possimus provident quaerat quisquam reiciendis repellendus rerum sed suscipit voluptate
          voluptatibus? Ad aspernatur cum debitis dolore illo ipsa labore, officia porro quos reprehenderit repudiandae
          saepe suscipit, totam ut veniam? Accusamus iusto, repudiandae! A aliquid amet animi at consequuntur delectus
          dicta ea eaque eligendi enim excepturi expedita facilis fugit iste labore, laudantium minima nam nobis officia
          placeat quae quod recusandae sequi suscipit tempore tenetur unde voluptatum. Aliquam consequatur maiores,
          nostrum quibusdam voluptas voluptatum! Perspiciatis. debitis doloribus earum et explicabo in modi nam, natus
          necessitatibus qui repudiandae soluta unde ut velit veritatis! Accusantium aliquam aspernatur aut dolor
          doloribus in maiores nesciunt nobis numquam, quo sint tempora tempore, temporibus velit veritatis. Accusamus
          aliquid amet aut et magni perspiciatis quam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          architecto asperiores aut, cum cumque eum, eveniet excepturi fuga fugiat hic iste magnam nostrum odio officiis
          perspiciatis placeat possimus provident quaerat quisquam reiciendis repellendus rerum sed suscipit voluptate
          voluptatibus? Ad aspernatur cum debitis dolore illo ipsa labore, officia porro quos reprehenderit repudiandae
          saepe suscipit, totam ut veniam? Accusamus iusto, repudiandae! A aliquid amet animi at consequuntur delectus
          dicta ea eaque eligendi enim excepturi expedita facilis fugit iste labore, laudantium minima nam nobis officia
          placeat quae quod recusandae sequi suscipit tempore tenetur unde voluptatum. Aliquam consequatur maiores,
          nostrum quibusdam voluptas voluptatum! Perspiciatis. pudiandae saepe suscipit, totam ut veniam? Accusamus
          iusto, repudiandae! A aliquid amet animi at consequuntur delectus dicta ea eaque eligendi enim excepturi
          expedita facilis fugit iste labore, laudantium minima nam nobis officia placeat quae quod recusandae sequi
          suscipit tempore tenetur unde voluptatum. Aliquam consequatur maiores, nostrum quibusdam voluptas voluptatum!
          Perspiciatis. debitis doloribus earum et explicabo in modi nam, natus necessitatibus qui repudiandae soluta
          unde ut velit veritatis! Accusantium aliquam aspernatur aut dolor doloribus in maiores nesciunt nobis numquam,
          quo sint tempora tempore, temporibus velit veritatis. Accusamus aliquid amet aut et magni perspiciatis quam?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores aut, cum cumque eum,
          eveniet excepturi fuga fugiat hic iste magnam nostrum odio officiis perspiciatis placeat possimus provident
          quaerat quisquam reiciendis repellendus rerum sed suscipit voluptate voluptatibus? Ad aspernatur cum debitis
          dolore illo ipsa labore, officia porro quos reprehenderit repudiandae saepe suscipit, totam ut veniam?
          Accusamus iusto, repudiandae! A aliquid amet animi at consequuntur delectus dicta ea eaque eligendi enim
          excepturi expedita facilis fugit iste labore, laudantium minima nam nobis officia placeat quae quod recusandae
          sequi suscipit tempore tenetur unde voluptatum. Aliquam consequatur maiores, nostrum quibusdam voluptas
          voluptatum! Perspiciatis. pudiandae saepe suscipit, totam ut veniam? Accusamus iusto, repudiandae! A aliquid
          amet animi at consequuntur delectus dicta ea eaque eligendi enim excepturi expedita facilis fugit iste labore,
          laudantium minima nam nobis officia placeat quae quod recusandae sequi suscipit tempore tenetur unde
          voluptatum. Aliquam consequatur maiores, nostrum quibusdam voluptas voluptatum! Perspiciatis. debitis
          doloribus earum et explicabo in modi nam, natus necessitatibus qui repudiandae soluta unde ut velit veritatis!
          Accusantium aliquam aspernatur aut dolor doloribus in maiores nesciunt nobis numquam, quo sint tempora
          tempore, temporibus velit veritatis. Accusamus aliquid amet aut et magni perspiciatis quam? Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Aliquam architecto asperiores aut, cum cumque eum, eveniet excepturi
          fuga fugiat hic iste magnam nostrum odio officiis perspiciatis placeat possimus provident quaerat quisquam
          reiciendis repellendus rerum sed suscipit voluptate voluptatibus? Ad aspernatur cum debitis dolore illo ipsa
          labore, officia porro quos reprehenderit repudiandae saepe suscipit, totam ut veniam? Accusamus iusto,
          repudiandae! A aliquid amet animi at consequuntur delectus dicta ea eaque eligendi enim excepturi expedita
          facilis fugit iste labore, laudantium minima nam nobis officia placeat quae quod recusandae sequi suscipit
          tempore tenetur unde voluptatum. Aliquam consequatur maiores, nostrum quibusdam voluptas voluptatum!
          Perspiciatis.
        </BodyTextSmall>
      </ScrollView>
      {isScrolledToEnd && (
        <View style={styles.buttons}>
          <View style={styles.buttonSize}>
            <SecondaryButton title="Decline" />
          </View>
          <View style={styles.buttonSize}>
            <PrimaryButton title="Accept" />
          </View>
        </View>
      )}
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    scrollView: {
      flexGrow: 1
    },
    textContainer: {
      backgroundColor: theme.colors.background,
      padding: 8,
      borderRadius: 10
    },
    buttons: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
      gap: 16
    },
    buttonSize: {
      width: 150
    }
  });
