
import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Award, Play, Star, Facebook, Phone, MessageCircle } from 'lucide-react';

const Index = () => {
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      content: "Đã giảm được 15kg trong 3 tháng với chương trình tập luyện khoa học!",
      image: "/placeholder.svg"
    },
    {
      name: "Trần Thị B", 
      content: "PT rất tận tâm, meal plan cực kỳ hiệu quả. Cảm ơn coach!",
      image: "/placeholder.svg"
    },
    {
      name: "Lê Văn C",
      content: "Tăng cân vào cơ thành công sau 6 tháng. Highly recommended!",
      image: "/placeholder.svg"
    }
  ];

  const workoutVideos = [
    {
      title: "Bài tập ngực cho người mới bắt đầu",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Chương trình cardio giảm cân hiệu quả",
      videoId: "dQw4w9WgXcQ", 
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Bài tập vai 3D cho nam",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "/placeholder.svg"
    }
  ];

  const contactInfo = {
    facebook: "https://facebook.com/phinguyen.pt",
    zalo: "0987654321",
    phone: "0987654321"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-fitness-primary to-fitness-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Personal Trainer Chuyên Nghiệp
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Hơn 5 năm kinh nghiệm trong việc giúp khách hàng đạt được mục tiêu fitness. 
            Chương trình tập luyện và dinh dưỡng được cá nhân hóa cho từng người.
          </p>
          <div className="flex justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-fitness-primary hover:bg-gray-100 px-8 py-3">
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Về Personal Trainer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tôi là một Personal Trainer với hơn 5 năm kinh nghiệm trong lĩnh vực fitness và dinh dưỡng. 
                Tôi đã giúp hơn 200 khách hàng đạt được mục tiêu của họ, từ giảm cân, tăng cân, đến xây dựng cơ bắp.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-fitness-primary">200+</div>
                  <div className="text-sm text-gray-600">Khách hàng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-fitness-primary">5+</div>
                  <div className="text-sm text-gray-600">Năm KN</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-fitness-primary">95%</div>
                  <div className="text-sm text-gray-600">Thành công</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="/placeholder.svg" 
                alt="Personal Trainer" 
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Dịch vụ của tôi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Dumbbell className="w-12 h-12 text-fitness-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Chương trình tập luyện</h3>
                <p className="text-gray-600">
                  Thiết kế chương trình tập luyện cá nhân hóa phù hợp với mục tiêu và thể trạng của bạn.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-fitness-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Kế hoạch dinh dưỡng</h3>
                <p className="text-gray-600">
                  Xây dựng thực đơn dinh dưỡng khoa học, tính toán calories phù hợp với mục tiêu của bạn.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-fitness-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Theo dõi tiến độ</h3>
                <p className="text-gray-600">
                  Theo dõi và đánh giá tiến độ, điều chỉnh chương trình để đạt hiệu quả tối ưu.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Video hướng dẫn</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {workoutVideos.map((video, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-t-lg">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{video.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Khách hàng nói gì</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Liên hệ với tôi</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Facebook className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Facebook</h3>
                  <a 
                    href={contactInfo.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Phi Nguyễn PT
                  </a>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Zalo</h3>
                  <a 
                    href={`https://zalo.me/${contactInfo.zalo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {contactInfo.zalo}
                  </a>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Phone className="w-12 h-12 text-fitness-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Điện thoại</h3>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-fitness-primary hover:underline"
                  >
                    {contactInfo.phone}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-fitness-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Sẵn sàng bắt đầu hành trình fitness?</h2>
          <p className="text-xl mb-8 opacity-90">
            Liên hệ với tôi để nhận tư vấn miễn phí và bắt đầu chương trình tập luyện của bạn!
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-fitness-primary hover:bg-gray-100 px-8 py-3">
              Đăng nhập
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Dumbbell className="w-6 h-6" />
            <span className="text-xl font-bold">Phi Nguyễn Personal Trainer</span>
          </div>
          <p className="text-gray-400">© 2024 Phi Nguyễn Personal Trainer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
