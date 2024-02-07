import { H3, H5, H6 } from "tamagui";
import { Card, XStack, Image } from 'tamagui';
import { Pressable } from "react-native";
import EditModal from "~/app/components/EditModal";

export function BasicCards({setShowEditModal, data, deleteFeature}) {
  console.log("Edit Modal=>",setShowEditModal);
    return (
      <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
        {data.map((value, index) => {
          return (
            <DemoCard
              key={index}
              data={value}
              showEditModal={setShowEditModal}
              deleteFeature={deleteFeature}
          />
        );
      })}
      </XStack>
    );
  }

export function DemoCard({showEditModal, data, deleteFeature}) {
  const editModal=()=>{
    showEditModal(true);
  }

  const handleDelete = async (id) => {
    try {
      await deleteFeature("film", id);
      console.log('Feature deleted successfully');
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  return (
    <Card elevate size="$4" 
          bordered={2}  
          borderColor={'white'}
          animation="bouncy"
          width={"100%"}
          height= {'auto'}
          scale={0.9}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
    >
      <Card.Header padded>
        <H3>{data.title}</H3>
        <H5>Director: <H6>{data.director}</H6></H5>
        <H5>Tiempo: <H6>{data.duration + "min"}</H6></H5>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Pressable
          style={{ marginHorizontal: 5 }}
          onPress={() => {
            editModal();
          }}>
          <Image source={require('../../assets/edit.png')} style={{top:-10}}/>
        </Pressable>
        <Pressable
          style={{ marginHorizontal: 6 }}
          onPress={() => {
            handleDelete(data.id);
          }}>
        <Image source={require('../../assets/delete.png')} style={{top:-10}} />
</Pressable>
      </Card.Footer>

      <Card.Background backgroundColor='black' borderRadius={5}>

      </Card.Background>

    </Card>
  );
}