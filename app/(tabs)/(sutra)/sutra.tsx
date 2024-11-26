import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Sutra() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color='#808080'
          name='chevron.left.forwardslash.chevron.right'
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>ພຣະສູດ</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>ອະນຸສະຢະສາມຄູ່ກັບເວທະນາສາມ</ThemedText>
        <ThemedText>
          ພິກຂຸ ທ. ! ເພາະອາໄສຕາດ້ວຍ ຮູບທັງຫຼາຍດ້ວຍ
          ຈຶ່ງເກີດຈັກຂຸວິນຍານ;ການປະຈວບພໍ້ພ້ອມແຫ່ງທັມ 3 ປະການ
          (ຕາ+ຮູບ+ຈັກຂຸວິນຍານ) ນັ້ນຄື ຜັສສະ; ເພາະມີຜັດສະເປັນປັດໃຈ ຈຶ່ງເກີດເວທະນາ
          ອັນເປັນສຸຂແດ່ ເປັນທຸກຂ໌ແດ່ ບໍ່ແມ່ນທຸກຂ໌ບໍ່ແມ່ນສຸຂແດ່. ບຸຄຄົລນັ້ນ ເມື່ອ
          ສຸຂະເວທະນາ ຖືກຕ້ອງຢູ່ ຍ່ອມເພີດເພີນ ຍ່ອມພໍ່າສັນເສີນ ເມົາໝົກຢູ່; ອະນຸສັຍ
          ຄືຣາຄະ ຍ່ອມຕາມນອນ (ເພີ່ມຄວາມເຄີຍຊິນໃຫ້) ແກ່ບຸຄຄົລນັ້ນ (ຕັສສະ
          ຣາຄານຸສະໂຢ ອະນຸເສຕິ); ເມື່ອ ທຸກຂະເວທະນາ ຖືກຕ້ອງຢູ່ ເຂົາຍ່ອມເສົ້າໂສກ
          ຍ່ອມຣະທົມໃຈຍ່ອມຄໍ່າຄວນ ຍ່ອມຕີເອິກຮ້ອງໄຫ້ ຍ່ອມເຖິງຄວາມຫຼົງໄຫຼຢູ່;
          ອະນຸສັຍ ຄືປະຕິຄະຍ່ອມຕາມນອນ (ເພີ່ມຄວາມເຄີຍຊິນໃຫ້) ແກ່ບຸຄຄົລນັ້ນ. ເມື່ອ
          ເວທະນາອັນບໍ່ແມ່ນທຸກຂ໌ບໍ່ແມ່ນສຸຂ ຖືກຕ້ອງຢູ່ ເຂົາຍ່ອມບໍ່ຮູ້ຕາມເປັນຈິງ
          ຊຶ່ງເຫຕໃຫ້ເກີດເວທະນານັ້ນດ້ວຍ ຊຶ່ງຄວາມດັບບໍ່ເຫຼືອແຫ່ງເວທະນານັ້ນດ້ວຍ
          ຊຶ່ງອັສສາທະ (ສະເໜ່) ຂອງເວທະນານັ້ນດ້ວຍ ຊຶ່ງອາທິນວະ (ໂທດ)
          ຂອງເວທະນານັ້ນດ້ວຍ ຊຶ່ງນິສສະຣະນະ (ອຸບາຍເຄື່ອງອອກພົ້ນໄປໄດ້)
          ຂອງເວທະນານັ້ນດ້ວຍ; ອະນຸສັຍ ຄືອະວິຊຊາ ຍ່ອມຕາມນອນ (ເພີ່ມຄວາມເຄີຍຊິນໃຫ້)
          ແກ່ບຸຄຄົລນັ້ນ. ພິກຂຸ ທ. ! ບຸຄຄົລນັ້ນໜໍ ຍັງລະຣາຄານຸໄສ
          ອັນເກີດຈາກສຸຂະເວທະນາບໍ່ໄດ້; ຍັງບັນເທົາ ປະຕິຄານຸໄສ
          ອັນເກີດຈາກທຸກຂະເວທະນາບໍ່ໄດ້; ຍັງຖອນ ອະວິຊຊາ ນຸໄສ
          ອັນເກີດຈາກອະທຸກຂະມະສຸຂະເວທະນາບໍ່ໄດ້; ເມື່ອຍັງລະອະວິຊຊາບໍ່ໄດ້
          ແລະຍັງເຮັດ ວິຊຊາ ໃຫ້ເກີດຂຶ້ນບໍ່ໄດ້ແລ້ວ, ເຂົາຈະເຮັດທີ່ສຸດແຫ່ງທຸກຂ໌
          ໃນທິຕຖະທັມ (ປັຈຈຸບັນ) ນີ້ ໄດ້ນັ້ນ; ຂໍ້ນີ້ ບໍ່ເປັນຖານະ ທີ່ຈະມີໄດ້.
          (ໃນກໍລະນີແຫ່ງຫູ ດັງ ລິ້ນ ກາຍ ແລະໃຈ ກໍໄດ້ຕຣັດໂດຍເຊັ່ນດຽວກັນກັບ
          ໃນກໍລະນີແຫ່ງຕາ.) - ອຸປະຣິ. ມ. ໑໔/໕໑໖/໘໒໒.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
  },
});
