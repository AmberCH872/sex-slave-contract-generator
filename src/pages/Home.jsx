import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const features = [
  {
    icon: '📜',
    title: '专业模板库',
    description: '提供多种 BDSM 协议模板，包括主奴契约、宠玩协议、24/7 权力交换等',
    color: 'from-gold-500 to-yellow-600'
  },
  {
    icon: '✏️',
    title: '完全自定义',
    description: '编辑每一个字，添加专属条款，打造独一无二的契约文本',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: '🎨',
    title: '精美排版',
    description: '优雅的古典风格设计，支持打印和 PDF 导出',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: '🔒',
    title: '隐私保护',
    description: '所有数据本地处理，不上传云端，完全私密安全',
    color: 'from-green-500 to-emerald-600'
  }
]

const dynamics = [
  { name: '基本主奴契约', path: '/generator?type=basic-ds' },
  { name: '宠玩协议 (Pet Play)', path: '/generator?type=pet-play' },
  { name: '24/7 全权交换', path: '/generator?type=tpe' },
  { name: '哥罗奴隶契约', path: '/generator?type=gorean-slave' },
  { name: '女上位协议 (Femdom)', path: '/generator?type=femdom' },
  { name: '宠物饲养协议', path: '/generator?type=pet-play-2' }
]

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="container-custom py-24 md:py-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-gold-400/20 border border-gold-400/30">
            <span className="text-gold-400 font-semibold tracking-wider text-sm uppercase">
              专业 BDSM 协议生成工具
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gold-400 via-yellow-500 to-gold-400 
                       bg-clip-text text-transparent">
              性奴认主协议
            </span>
            <br />
            <span className="text-gray-300">生成器</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            创建专业、优雅且完全个性化的 BDSM 契约文档。从精美模板开始，编辑每一个细节，
            生成可打印的正式协议。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/generator" className="btn-primary">
              立即开始创建
            </Link>
            <a href="#features" className="btn-secondary">
              了解更多
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container-custom py-20">
        <div className="text-center mb-16">
          <h2 className="section-title">核心功能</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            专业的工具，为您的 BDSM 关系提供完美的契约保障
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Template Section */}
      <section className="container-custom py-20">
        <div className="text-center mb-16">
          <h2 className="section-title">协议模板</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            选择适合您关系的动态类型，每个模板都经过精心设计
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamics.map((dynamic, index) => (
            <motion.a
              key={index}
              href={dynamic.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-2xl ${index === 0 ? 'text-gold-400' : 'text-gray-400'}`}>
                  {index === 0 ? '👑' : index === 1 ? '🐕' : index === 2 ? '⚡' : 
                   index === 3 ? '📜' : index === 4 ? '💅' : '🏠'}
                </span>
                <div className="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center group-hover:bg-gold-400/30 transition-all">
                  <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-gold-400 transition-colors">
                {dynamic.name}
              </h3>
              <p className="text-gray-500 text-sm">
                点击开始创建您的专属协议
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container-custom py-20">
        <div className="text-center mb-16">
          <h2 className="section-title">如何使用</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            三步创建您的完美契约
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: '选择模板', desc: '从专业模板库中选择适合您关系的协议类型' },
            { step: '2', title: '自定义编辑', desc: '修改每一个细节，添加专属条款和个性化内容' },
            { step: '3', title: '预览导出', desc: '查看最终效果，打印或下载 PDF 版本' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold-500 to-yellow-600 
                           flex items-center justify-center text-3xl font-bold shadow-lg">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-dark-800 to-dark-700 rounded-2xl p-12 text-center border border-gold-400/30"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            准备好创建您的契约了吗？
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            专业的工具，优雅的设计，完全私密。立即开始您的认主之旅。
          </p>
          <Link to="/generator" className="btn-primary inline-block">
            开始创建协议
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container-custom py-12 border-t border-gold-400/20 text-center">
        <p className="text-gray-500 mb-2">
          © 2026 BDSM Contract Generator | All Rights Reserved
        </p>
        <p className="text-gray-600 text-sm">
          Designed for the modern kink community
        </p>
      </footer>
    </div>
  )
}
