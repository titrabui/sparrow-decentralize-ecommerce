import img1 from 'assets/images/container/p1.png';
import img10 from 'assets/images/container/p10.png';
import img11 from 'assets/images/container/p11.png';
import img12 from 'assets/images/container/p12.png';
import img2 from 'assets/images/container/p2.png';
import img3 from 'assets/images/container/p3.png';
import img4 from 'assets/images/container/p4.png';
import img5 from 'assets/images/container/p5.png';
import img6 from 'assets/images/container/p6.png';
import img7 from 'assets/images/container/p7.png';
import img8 from 'assets/images/container/p8.png';
import img9 from 'assets/images/container/p9.png';

const getImage = (productId: number) => {
  switch (productId) {
    case 1:
      return img1;
    case 2:
      return img2;
    case 3:
      return img3;
    case 4:
      return img4;
    case 5:
      return img5;
    case 6:
      return img6;
    case 7:
      return img7;
    case 8:
      return img8;
    case 9:
      return img9;
    case 10:
      return img10;
    case 11:
      return img11;
    case 12:
      return img12;
    default:
      return img1;
  }
};

export default getImage;
