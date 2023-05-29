import React from 'react'
import bg from '../img/background.png'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import '../pages/Parallax.css'
const Para = () => {
  return (
  
    <Parallax className='animation' pages={1.7} >
      <ParallaxLayer className='bg-img' offset={0} speed={0.6}style={{
        backgroundImage:`url(${bg})`,
        backgroundSize: 'cover',

      }}>
             <div className='animation_layer parallax mt-[40%]' ></div>
      </ParallaxLayer>
      <ParallaxLayer  factor={2} offset={0} speed={1.6}>
             <h3 className='head1'>Hi There</h3>
             
      </ParallaxLayer>
      
      <ParallaxLayer offset={0} speed={0.2}>
             <div className='animation_layer parallax' id='fog1'></div>
      </ParallaxLayer>
      
      <ParallaxLayer offset={0} speed={0.2}>
             <div className='animation_layer parallax' id='fog6'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.3}>
             <div className='animation_layer parallax' id='fog7'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.9} factor={0}>
        
             <div className='animation_layer parallax' id='mountain1'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.3} factor={0.2}>
             <div className='animation_layer parallax' id='mountain2'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.39} factor={0}>
             <div className='animation_layer parallax' id='mountain3'></div>
      </ParallaxLayer>
      <ParallaxLayer className='text-animation1' factor={1} offset={0} speed={2}>
             <h2>Scroll down and let's find out</h2>
      </ParallaxLayer>
     
      <ParallaxLayer offset={0} speed={0.4} factor={0}>
             <div className='animation_layer parallax' id='mountain7'></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.6} factor={0}>
             <div className='animation_layer parallax' id='mountain8'></div>
      </ParallaxLayer>
  
     {/* <ParallaxLayer offset={0.6} speed={0.5}>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptate facilis distinctio, suscipit, doloribus placeat facere rem incidunt laboriosam magnam quae ipsa dolor delectus corrupti fuga. Saepe tenetur dolore fugiat iure. Quaerat vel expedita iste voluptatem magnam distinctio dolorum exercitationem unde dolor praesentium voluptates, fugit, dicta a, illum laboriosam nam enim! Quos sint officia optio non aspernatur corporis debitis, a recusandae fuga blanditiis, enim aperiam nostrum soluta. Ut rerum nam vitae eum ratione consequatur sint? Deserunt nihil dolorum deleniti natus aperiam dolorem fugiat magnam, error consectetur delectus ullam beatae, assumenda, et est odio nam? Laudantium, nemo impedit debitis dolore porro asperiores, tenetur molestiae corporis sapiente nulla ex error! Inventore quo itaque deserunt odit corporis corrupti, exercitationem mollitia! Magni eum ullam inventore quis tenetur, cumque, culpa alias ea perferendis mollitia ad? Atque, at voluptatem possimus perferendis ipsam adipisci. Error minus dolor rem, fugit harum, perferendis cupiditate illo ipsum quidem eveniet ex beatae tempora non odio deserunt omnis placeat obcaecati, incidunt animi illum totam ut? In illo mollitia eveniet aliquam laboriosam eligendi asperiores sequi ipsum soluta veniam consectetur est fugiat numquam fugit similique iusto nostrum nesciunt itaque excepturi, inventore quae? Repudiandae velit dolorum, error ab fugit tempore voluptate quidem saepe dolore doloremque itaque quo nemo. Fuga voluptatibus error accusantium praesentium magni non, quibusdam neque nam consectetur at! Expedita excepturi sapiente velit libero animi quidem quam numquam, enim suscipit assumenda sunt eos rem sint eaque, illum id ducimus nulla minima optio reiciendis consectetur explicabo error doloribus. Quo sed quisquam, vero non deleniti labore minima ipsam ullam minus assumenda dolorem tenetur nostrum quos nihil illum cum eligendi obcaecati culpa adipisci facilis porro, iste dicta error? Itaque facere aperiam exercitationem hic tempore delectus nulla, et minima distinctio voluptates enim similique. Nulla incidunt repellat, quidem voluptas vitae quia maxime est aperiam velit quis non dignissimos nisi ipsa architecto cum ad ipsum veritatis reiciendis repellendus ea provident cupiditate hic dicta? Magnam fugiat alias maxime maiores molestiae tempora ea ut praesentium? Sunt error minus perferendis at totam ratione numquam corporis non dolores quis ullam labore eligendi, est velit, suscipit adipisci voluptates ea aliquid maiores! Beatae ullam excepturi, distinctio qui nihil odit error repudiandae suscipit eligendi perspiciatis, dolorum similique non. Quia placeat ex explicabo in nostrum tenetur repudiandae facere officiis iure, optio repellendus aperiam qui quaerat, cumque eligendi a dicta ut temporibus eum earum voluptatibus est iusto. Tenetur voluptate ipsa accusantium perferendis optio nobis dolorum nemo eligendi provident mollitia? Necessitatibus est exercitationem optio dolores enim ab sit non iure quidem minus incidunt assumenda, suscipit consequuntur ullam et distinctio quos magni laudantium quibusdam dolor dicta aut aspernatur nesciunt quasi? Itaque voluptates ad dolores aut, quam sapiente velit ea, magni, eligendi odit eum minus? Rem vitae labore, commodi distinctio tempora incidunt molestiae, odio fugit nostrum consectetur modi, mollitia deserunt laudantium sint autem quae officia accusamus! Nesciunt tempore placeat autem, aliquid maiores quo laudantium ex vitae, illo eos doloribus? Dolore aliquam officia sapiente illum, itaque rem, velit magnam quis enim voluptatibus eum quidem harum debitis atque dicta ratione. Omnis hic, natus sit distinctio ut impedit excepturi neque voluptatem amet veritatis doloribus illum, molestiae provident sunt eius ab nulla delectus aspernatur eum accusamus laudantium. Repudiandae esse iure ipsum totam libero assumenda eaque illum consectetur? Enim nihil voluptates nostrum autem reprehenderit mollitia commodi dignissimos, perferendis impedit accusamus, dolorum sunt ipsa itaque saepe qui est maiores aperiam quasi! Odio dolore similique iusto hic dignissimos repudiandae voluptates accusantium laboriosam. Ipsam repudiandae itaque laboriosam illo vero, architecto doloribus tempore velit temporibus facilis saepe, perspiciatis molestiae iste necessitatibus atque optio magnam vitae fugit? Nisi quae optio dolore maiores obcaecati omnis incidunt quos placeat. Ducimus itaque unde cum cumque eos nihil, ipsam laborum deserunt similique incidunt alias ullam sapiente corrupti blanditiis atque inventore necessitatibus. Omnis architecto sint deleniti sapiente dicta accusamus distinctio eveniet maiores error, suscipit, itaque et ex voluptates sunt deserunt eligendi dolore odit ipsa aspernatur modi rerum! Enim alias in laborum possimus sapiente cupiditate necessitatibus laboriosam mollitia earum voluptatibus natus eos, repellat corporis magni, eveniet ab quidem, iste ea commodi harum asperiores. Cumque et ipsum, aut sequi tempora hic dolore molestias ex delectus labore optio, sunt, tempore in. Odio impedit sint enim iure numquam autem magnam omnis ratione excepturi, sit dolore rerum, beatae vero a delectus. Iusto aliquam ex itaque labore quas dolor quae odio aliquid, quam optio qui quibusdam expedita eaque molestias iste beatae voluptas vero, officiis dolorum autem at necessitatibus magnam. In facere explicabo voluptate consectetur! Harum, consequatur amet. Voluptas ipsum tempora atque tempore assumenda dolor odio. Accusantium blanditiis facere tempora voluptatum recusandae fugit, voluptatem inventore non libero, autem reprehenderit laudantium modi aliquid deleniti ut facilis consequatur, dolor qui dicta ipsam repudiandae? Quod esse necessitatibus quidem, recusandae accusantium optio voluptate possimus, quaerat deserunt ipsam enim? Quis et eos quaerat non nam sed? Impedit blanditiis rerum odio minima nostrum temporibus consequuntur iure expedita nobis illum. Libero aut deserunt pariatur sequi rem asperiores reprehenderit doloremque ratione obcaecati voluptates ipsam non sint quisquam ex aperiam perspiciatis blanditiis nam ea, facere sunt enim aspernatur voluptatum atque dolorem! Cumque adipisci illum repudiandae ipsum id a, animi, exercitationem molestias nobis inventore fugit eveniet libero officiis reiciendis necessitatibus. Suscipit, iste, ad quo hic voluptatem itaque dolores ipsa ex temporibus sint reiciendis eveniet neque praesentium quidem mollitia fugit velit! Corporis dolorem eius aliquam, quae vel aut porro dolores ea tempore expedita deleniti soluta esse nemo asperiores eaque neque laborum dolorum perferendis eos. Reiciendis, voluptate temporibus debitis, repudiandae tempora laudantium deserunt in facilis distinctio voluptates dicta labore similique exercitationem, cupiditate corporis dignissimos. Autem esse sed magnam! Ad tenetur magni voluptatem? Fugiat quam architecto cumque perferendis doloremque eligendi voluptatum quos magni odio ad voluptatibus asperiores mollitia, vero maxime, enim ea quisquam ipsa eius? Repellendus velit, laborum veniam rerum fugit ratione consectetur voluptas inventore, consequuntur vel magnam suscipit magni nesciunt et sit deserunt officia natus vero. Repudiandae rem, suscipit recusandae ipsam doloremque error voluptas accusamus excepturi ipsa atque ut dolorum nihil nam magni dolorem nemo architecto possimus esse deleniti perferendis neque labore omnis non? Aliquid aspernatur debitis inventore, ipsum unde vel! Cum quasi nobis ratione unde!</p>
     </ParallaxLayer> */}
    </Parallax>

  )
}

export default Para