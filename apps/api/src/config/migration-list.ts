import { InitTableMigration } from '../app/migration/001-init-table.migration';
import { PrivilegeMigration } from '../app/migration/002-privilege.migration';
import { EventPrivilegeMigration } from '../app/migration/003-event-privilege.migration';
import { UserCalendarEventMigration } from '../app/migration/004-user_calendar_event.migration';
import { AddingZnrMigration } from '../app/migration/005-adding-znr.migration';
import { migrationNameSe1610886179094 } from '../app/migration/006-adding-foil-amount.migration';
import { migrationNameSe1611402162304 } from '../app/migration/007-adding-khm.migration';
import { AddingStaMigration } from '../app/migration/008-adding-sta.migration';
import { AddingStxMigration } from '../app/migration/009-adding-stx.migration';
import { addingBfz1620386823589 } from '../app/migration/1620386823589-adding-bfz.migration';
import { addingOgw1620387128242 } from '../app/migration/1620387128242-adding-ogw.migration';
import { addingSoi1620387315622 } from '../app/migration/1620387315622-adding-soi.migration';
import { addingEmn1620387686808 } from '../app/migration/1620387686808-adding-emn.migration';
import { addingKld1620387962198 } from '../app/migration/1620387962198-adding-kld.migration';
import { addingAer1620389641215 } from '../app/migration/1620389641215-adding-aer.migration';
import { addingAkh1620389785749 } from '../app/migration/1620389785749-adding-akh-migration';
import { addingHou1620390083838 } from '../app/migration/1620390083838-adding-hou.migration';
import { addingXln1620390186868 } from '../app/migration/1620390186868-adding-xln.migration';
import { addingRix1620390311551 } from '../app/migration/1620390311551-adding-rix.migration';
import { addingDom1620390570432 } from '../app/migration/1620390570432-adding-dom.migration';
import { addingM191620390697337 } from '../app/migration/1620390697337-adding-m19.migration';
import { addingGrn1620391083464 } from '../app/migration/1620391083464-adding-grn.migration';
import { addingRna1620394763075 } from '../app/migration/1620394763075-adding-rna.migration';
import { addingWar1620399859574 } from '../app/migration/1620399859574-adding-war.migration';
import { addingM201620400069138 } from '../app/migration/1620400069138-adding-m20.migration';
import { addingEld1620400747690 } from '../app/migration/1620400747690-adding-eld.migration';
import { addingThb1620400825744 } from '../app/migration/1620400825744-adding-thb.migration';
import { addingIko1620400921320 } from '../app/migration/1620400921320-adding-iko.migration';
import { addingM211620401126927 } from '../app/migration/1620401126927-adding-m21.migration';
import { CreatingUniqueCardTable } from '../app/migration/1627043317584-creating-unique-card-table.migration';
import { AddingAfr1627731090125 } from '../app/migration/1627731090125-adding-afr.migration';
import { uniqueCardFixAddingAfr1627731429267 } from '../app/migration/1627731429267-unique-card-fix-adding-afr.migration';
import { addingMid1631469344595 } from '../app/migration/1631469344595-adding-mid.migration';
import { addingVow1636386139861 } from '../app/migration/1636386139861-adding-vow.migration';
import { CreateCardVariations1643453448414 } from '../app/migration/1643453448414-create-card-variations.migration';
import { addingNeo1644416596464 } from '../app/migration/1644416596464-adding-neo.migration';
import { defaultPossibleCardInsert1643458833698 } from '../app/migration/1644416596500-default-possible-card-insert.migration';
import { createSnc1650101408910 } from '../app/migration/1650101408910-create-snc.migration';
import { addingNormalSnc1651003866790 } from '../app/migration/1651003866790-adding-normal-snc.migration';
import { addDmu1661856164149 } from '../app/migration/1661856164149-add-dmu.migration';
import { typeAndColor1663941595622 } from '../app/migration/1663941595622-type-and-color.migration';
import { dmuColor1663974517549 } from '../app/migration/1663974517549-dmu-color.migration';
import { colorTypeSnc1664012013553 } from '../app/migration/1664012013553-color-type-snc.migration';
import { colorTypeNeo1664012362882 } from '../app/migration/1664012362882-color-type-neo.migration';
import { colorTypeVow1664012716322 } from '../app/migration/1664012716322-color-type-vow.migration';
import { colorTypeMid1664013706149 } from '../app/migration/1664013706149-color-type-mid.migration';
import { updateColorType1664462619430 } from '../app/migration/1664462619430-update-color-type.migration';
import { updateColorTypeVol21664495521380 } from '../app/migration/1664495521380-update-color-type-vol-2.migration';
import { addBro1667774382000 } from '../app/migration/1667774382000-add-bro-cards.migration';
import { addBrr1668217007000 } from '../app/migration/1668217007000-add-brr-cards.migration';
import { addOne1668217007000 } from '../app/migration/1675208823000-add-one-cards.migration';
import { addMom1681676379564 } from '../app/migration/1681676379564-add-mom-cards.migration';
import { addMul1681802964787 } from '../app/migration/1681802964787-add-mul-cards.migration';
import { addMat1684249130782 } from '../app/migration/1684249130782-add-mat-cards.migration';
import { addWot1693652437654 } from '../app/migration/1693652437654-add-wot-cards.migration';
import { addWoe1693680778483 } from '../app/migration/1693680778483-add-woe-cards.migration';
import { addLci1699810202037 } from '../app/migration/1699729014758-add-lci-cards.migration';
import { addMkm1706824692302 } from '../app/migration/1706824692302-add-mkm-cards.migration';
import { addOtj1712527328175 } from '../app/migration/1712527328175-add-otj-cards.migration';

const migrationsList = [
    InitTableMigration,
    PrivilegeMigration,
    EventPrivilegeMigration,
    UserCalendarEventMigration,
    AddingZnrMigration,
    migrationNameSe1610886179094,
    migrationNameSe1611402162304,
    AddingStaMigration,
    AddingStxMigration,
    addingBfz1620386823589,
    addingOgw1620387128242,
    addingSoi1620387315622,
    addingEmn1620387686808,
    addingKld1620387962198,
    addingAer1620389641215,
    addingAkh1620389785749,
    addingHou1620390083838,
    addingXln1620390186868,
    addingRix1620390311551,
    addingDom1620390570432,
    addingM191620390697337,
    addingGrn1620391083464,
    addingRna1620394763075,
    addingWar1620399859574,
    addingM201620400069138,
    addingEld1620400747690,
    addingThb1620400825744,
    addingIko1620400921320,
    addingM211620401126927,
    CreatingUniqueCardTable,
    AddingAfr1627731090125,
    uniqueCardFixAddingAfr1627731429267,
    addingMid1631469344595,
    addingVow1636386139861,
    CreateCardVariations1643453448414,
    addingNeo1644416596464,
    defaultPossibleCardInsert1643458833698,
    createSnc1650101408910,
    addingNormalSnc1651003866790,
    addDmu1661856164149,
    typeAndColor1663941595622,
    dmuColor1663974517549,
    colorTypeSnc1664012013553,
    colorTypeNeo1664012362882,
    colorTypeVow1664012716322,
    colorTypeMid1664013706149,
    updateColorType1664462619430,
    updateColorTypeVol21664495521380,
    addBro1667774382000,
    addBrr1668217007000,
    addOne1668217007000,
    addMom1681676379564,
    addMul1681802964787,
    addMat1684249130782,
    addWot1693652437654,
    addWoe1693680778483,
    addLci1699810202037,
    addMkm1706824692302,
    addOtj1712527328175,
];

export default migrationsList;
