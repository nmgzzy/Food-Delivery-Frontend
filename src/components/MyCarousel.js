import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default class MyCarousel {


    render() {
        return (
            <Carousel autoplay>
                {/* <div><image src="../assets/pic1.jpg" /></div> */}
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        )
    }
}

// export default function MyCarousel() {
//     return (
//         <Carousel autoplay>
//             {/* <div><image src="../assets/pic1.jpg" /></div> */}
//             <div>
//                 <h3 style={contentStyle}>1</h3>
//             </div>
//             <div>
//                 <h3 style={contentStyle}>2</h3>
//             </div>
//             <div>
//                 <h3 style={contentStyle}>3</h3>
//             </div>
//             <div>
//                 <h3 style={contentStyle}>4</h3>
//             </div>
//         </Carousel>
//     )
// }
